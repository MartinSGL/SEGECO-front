import { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import type { GetProp, UploadProps } from 'antd';
import { RcFile } from 'antd/es/upload';
import axios from 'axios';
import { UploadFile } from 'antd/lib';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('solo se permiten las imagenes JPG/PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('La imagen debe ser menor a 2MB!');
  }
  return true;
};

export const Uploader = () => {
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setLoading(false);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Subir Imagen</div>
    </button>
  );

  //   TODO: change and move this fuction
  const uploadImage = async (file: RcFile) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const resp = await axios.post('http://localhost:3001/images', formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data;',
        },
      });
      if (resp?.data.data) {
        return resp?.data?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRemove = async (file: UploadFile) => {
    try {
      file.preview = await getBase64(file.originFileObj as FileType);
      console.log(file);
      const resp = await axios.delete(`http://localhost:3001/images/${image}`);

      if (resp?.data.data) {
        return resp?.data?.data?.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  return (
    <>
      <Upload
        name='avatar'
        listType='picture-circle'
        className='avatar-uploader'
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={4}
        accept='image/png, image/jpeg'
        onPreview={handlePreview}
        onRemove={onRemove}
        action={uploadImage}
        multiple={true}
      >
        {uploadButton}
      </Upload>

      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
