import React from 'react';
import { Modal } from 'antd';

interface Props{
  isModalOpen: boolean
  setIsModalOpen: any
}
const ModalConfirm = ({isModalOpen, setIsModalOpen}:Props) => {

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal title='Xác nhận' open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{color: "#92400e"}}>
        <p>Bạn chắc chắn chứ?</p>
      </Modal>
    </>
  );
};

export default ModalConfirm;
