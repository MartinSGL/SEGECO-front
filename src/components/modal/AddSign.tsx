import { Button, Modal } from 'antd';
import ReactSignatureCanvas from 'react-signature-canvas';
import './AddSign.css';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
};

export const AddSign = ({ isOpen, setIsOpen }: Props) => {
  const [supervisorSign, setSupervisorSign] =
    useState<ReactSignatureCanvas | null>();
  const [operatorSign, setOperatorSign] =
    useState<ReactSignatureCanvas | null>();

  const [url, setUrl] = useState<string | undefined>();

  const handleClear = (signType: 'supervisor' | 'operator') => {
    console.log(supervisorSign);
    signType === 'supervisor' ? supervisorSign?.clear() : operatorSign?.clear();
  };

  const handleGenerator = () => {
    setUrl(supervisorSign?.getTrimmedCanvas().toDataURL('image/png'));
  };

  return (
    <Modal
      title={'Firmar'}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      <div className='add_sign_container'>
        <div>
          <div>Firma del Supervisor</div>
          <ReactSignatureCanvas
            penColor='blue'
            canvasProps={{ width: 300, height: 150, className: 'canvas_sign' }}
            ref={(sign) => setSupervisorSign(sign)}
          />
          <div className='footer_buttons'>
            <Button onClick={() => handleClear('supervisor')}>Borrar</Button>
            <Button type='primary' onClick={handleGenerator}>
              Guardar
            </Button>
          </div>
        </div>
        <div>
          <div>Firma del Operador</div>
          <ReactSignatureCanvas
            penColor='blue'
            canvasProps={{ width: 300, height: 150, className: 'canvas_sign' }}
            ref={(sign) => setOperatorSign(sign)}
          />
          <div className='footer_buttons'>
            <Button onClick={() => handleClear('operator')}>Borrar</Button>
            <Button type='primary'>Guardar</Button>
          </div>
        </div>
        <img src={url} />
      </div>
    </Modal>
  );
};
