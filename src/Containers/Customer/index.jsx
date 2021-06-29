import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import React, { useEffect, useState } from 'react';
import ErrorConfirmationModal from 'shared/components/modal/ErrorConfirmationModal';
import Notification from 'shared/components/notification/Notification';
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
  DEFAULT_PAGE_SORT,
  DEFAULT_SORT_ORDER
} from 'shared/helpers/APIUtils';
import { useCustomer } from 'shared/hooks/CustomerHooks';
import CustomerList from './components/CustomerList';
import Title from './components/Title';
import { Dialog, DialogTitle } from '@material-ui/core';
import CustomerEdit from './components/CustomerEdit';

export default function Customer() {
  const [size, setSize] = useState(DEFAULT_PAGE_SIZE);
  const [page, setPage] = useState(DEFAULT_PAGE_NUMBER);
  const [sort, setSort] = useState(DEFAULT_PAGE_SORT);
  const [order, setOrder] = useState(DEFAULT_SORT_ORDER);
  const [query, setQuery] = useState('');

  const [modal, setModal] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false
  });

  const [customerId, setCustomerId] = useState(0);

  const [
    customerPagedList,
    onUpdateCustomer,
    onDeleteCustomer,
    { errorMsg, isLoading }
  ] = useCustomer(page, size, query, order, sort);

  useEffect(() => {
    if (errorMsg && errorMsg !== '') {
      setShowNotification({
        isOpen: true,
        message: errorMsg,
        type: 'error'
      });
    }
  }, [errorMsg]);

  const handleAddCustomer = (cId) => {
    console.log('handleAdd => ', cId);
    setCustomerId(cId);
    setModal(true);
  };

  const handleEditCustomer = (cId) => {
    console.log('handleEdit => ', cId);
    setCustomerId(cId);
    setModal(true);
  };

  const handleDeleteCustomer = (customer) => {
    console.log('handleDelete => ', customer.id);
    setConfirmModal({
      isOpen: true,
      onConfirm: () => {
        onDeleteCustomer(customer);
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
        handleCreate={() => handleAddCustomer(0)}
      />

      <CustomerList
        onAddCustomer={handleAddCustomer}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
        customerPagedList={customerPagedList}
        isLoading={isLoading}
        onPageChange={(p) => setPage(p - 1)}
        onSizeChange={(s) => setSize(s)}
        onOrderChange={(o) => setOrder(o)}
        order={order}
        onSearch={(e) => setQuery(e.target.value)}
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
          {customerId > 0 ? 'ویرایش اطلاعات مشتری' : 'ثبت مشتری جدید'}
        </DialogTitle>
        <CustomerEdit
          customerId={customerId}
          onUpdateCustomer={onUpdateCustomer}
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
