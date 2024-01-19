import { Modal } from "antd";
import { ReactElement } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  children: ReactElement;
};

export const AddCMItem = ({ title, isOpen, setIsOpen, children }: Props) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default AddCMItem;
