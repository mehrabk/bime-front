import { Button, Dialog } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function DeleteConfirmModal(props) {
  const { deleteModal, onCloseModal } = props;
  return (
    <Dialog
      open={deleteModal.isOpen}
      onClose={onCloseModal}
      classes={{ paper: 'shadow-lg rounded' }}>
      <div className="text-center p-5">
        <div className="avatar-icon-wrapper rounded-circle m-0">
          <div className="d-inline-flex justify-content-center p-0 rounded-circle btn-icon avatar-icon-wrapper bg-neutral-danger text-danger m-0 d-130">
            <FontAwesomeIcon
              icon={['fas', 'times']}
              className="d-flex align-self-center display-3"
            />
          </div>
        </div>
        <h4 className="font-weight-bold mt-4">
          آیا از حذف گزینه مورد نظر مطمئن هستید؟
        </h4>
        <p className="mb-0 font-size-lg text-muted">
          اطلاعات حذف شده غیر قابل برگشت است.
        </p>
        <div className="pt-4">
          <Button
            onClick={deleteModal.onConfirm}
            className="btn-danger btn-pill mx-1">
            <span className="btn-wrapper--label">حذف</span>
          </Button>
          <Button
            onClick={onCloseModal}
            className="btn-neutral-secondary btn-pill mx-1">
            <span className="btn-wrapper--label">خیر</span>
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
