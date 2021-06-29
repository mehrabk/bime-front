import React, { useEffect, useState } from 'react';
import { useGhest } from 'shared/hooks/GhestHooks';
import { useParams } from 'react-router';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import { Dialog, DialogTitle } from '@material-ui/core';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SORT,
  DEFAULT_SORT_ORDER
} from 'shared/helpers/APIUtils';
import Title from './components/Title';
import GhestEdit from './components/GhestEdit';
import Notification from 'shared/components/notification/Notification';
import ErrorConfirmationModal from 'shared/components/modal/ErrorConfirmationModal';
import GhestList from './components/GhestList';

export default function Ghest() {
  const { cId, bId } = useParams();
  const [modal, setModal] = useState(false);
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [sort, setSort] = useState(DEFAULT_PAGE_SORT);
  const [order, setOrder] = useState(DEFAULT_SORT_ORDER);
  const [ghestId, setGhestId] = useState();
  const [
    ghestList,
    onUpdateGhest,
    onDeleteGhest,
    { errorMsg, isLoading }
  ] = useGhest(bId, size, page, sort, order);
  const [showNotification, setShowNotification] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false
  });

  console.log(ghestList);

  useEffect(() => {
    if (errorMsg && errorMsg !== '') {
      setShowNotification({
        isOpen: true,
        message: errorMsg,
        type: 'error'
      });
    }
  }, [errorMsg]);

  const handleAddGhest = (id) => {
    setGhestId(id);
    setModal(true);
  };

  const handleEditGhest = (id) => {
    setGhestId(id);
    setModal(true);
  };

  const handleDeleteGhest = (ghest) => {
    setConfirmModal({
      isOpen: true,
      onConfirm: () => {
        onDeleteGhest(ghest);
        setConfirmModal({
          isOpen: false
        });
      }
    });
  };

  return (
    <>
      <Title
        titleHeading="پنل مدیریت مشتریان"
        titleDescription="مدیریت مشتریان / ایجاد و حذف قراردادها و ..."
        titleIcone={
          <PeopleOutlineOutlinedIcon
            className="text-primary"
            fontSize="large"
          />
        }
        handleCreate={() => handleAddGhest(0)}
      />
      <GhestList
        ghestList={ghestList}
        customerId={cId}
        onAddGhest={handleAddGhest}
        onEditeGhest={handleEditGhest}
        onDeleteGhest={handleDeleteGhest}
        onPageChange={(p) => setPage(p - 1)}
        onSizeChange={(s) => setSize(s)}
        onOrderChange={(o) => setOrder(o)}
        order={order}
      />
      <Dialog
        scroll="body"
        maxWidth="md"
        open={modal}
        onClose={() => setModal(!modal)}
        classes={{
          paper: 'modal-content rounded border-0 bg-white p-3 p-xl-0'
        }}>
        <DialogTitle
          disableTypography
          id="form-dialog-title"
          className="text-right bg-sidebar-dark">
          {ghestId > 0 ? 'ویرایش اطلاعات قسط' : 'ثبت قسط جدید'}
        </DialogTitle>
        <GhestEdit
          ghestId={ghestId}
          onUpdateGhest={onUpdateGhest}
          handleClose={() => setModal(!modal)}
        />
      </Dialog>

      <Notification
        showNotification={showNotification}
        onClose={() =>
          setShowNotification({ ...showNotification, isOpen: false })
        }
      />

      <ErrorConfirmationModal
        confirmModal={confirmModal}
        closeConfirmModal={() => setConfirmModal({ isOpen: false })}
      />
    </>
  );
}
