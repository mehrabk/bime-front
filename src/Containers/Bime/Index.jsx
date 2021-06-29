import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router';
import { useBime } from 'shared/hooks/BimeHooks';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import {
  Dialog,
  DialogTitle,
  Container,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import Title from './components/Title';
import BimeSalesForm from './components/BimeSalesForm';
import BimeBadaneForm from './components/BimeBadaneForm';
import BimeList from './components/BimeList';
import Notification from 'shared/components/notification/Notification';
import ErrorConfirmationModal from 'shared/components/modal/ErrorConfirmationModal';

export default function Bime() {
  const { cId } = useParams();
  const [modal, setModal] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false
  });
  const [bimeId, setBimeId] = useState(0);
  const [bimeType, setBimeType] = useState(1);
  const handleChangeBimeType = (event) => {
    setBimeType(event.target.value);
  };
  const [
    bimeList,
    onUpdateBime,
    onDeleteBime,
    { errorMsg, isLoading }
  ] = useBime(cId);

  useEffect(() => {
    if (errorMsg && errorMsg !== '') {
      setShowNotification({
        isOpen: true,
        message: errorMsg,
        type: 'error'
      });
    }
  }, [errorMsg]);

  const handleAddBime = (id) => {
    setBimeId(id);
    setModal(true);
  };

  const handleEditBime = (bime) => {
    setBimeId(bime.id);
    setBimeType(bime.type.value);
    setModal(true);
  };

  const handleDeleteBime = (bime) => {
    if (bime.id > 0) {
      setConfirmModal({
        isOpen: true,
        onConfirm: () => {
          onDeleteBime(bime);
          setConfirmModal({ isOpen: false });
        }
      });
    }
  };

  return (
    <>
      <Title
        titleHeading="قراردادها"
        titleDescription="لیست قراردادهای مشتری و ایجاد قرارداد..."
        titleIcone={
          <PeopleOutlineOutlinedIcon
            className="text-primary"
            fontSize="large"
          />
        }
        handleCreate={() => handleAddBime(0)}
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
          {bimeId > 0 ? 'ویرایش اطلاعات مشتری' : 'ثبت مشتری جدید'}
        </DialogTitle>
        <Container style={{ textAlign: 'right' }}>
          <FormControl component="fieldset">
            <RadioGroup row value={bimeType} onChange={handleChangeBimeType}>
              <FormControlLabel
                value="1"
                checked={bimeType === 1}
                control={<Radio />}
                label="بیمه ثالث"
                disabled={bimeId > 0 && bimeType === 2}
              />
              <FormControlLabel
                value="2"
                checked={bimeType === 2}
                control={<Radio />}
                label="بیمه بدنه"
                disabled={bimeId > 0 && bimeType === 1}
              />
            </RadioGroup>
          </FormControl>

          {bimeType && bimeType === 1 && (
            <BimeSalesForm
              customerId={cId}
              bimeId={bimeId}
              onUpdateBime={onUpdateBime}
              handleClose={() => setModal(!modal)}
            />
          )}

          {bimeType && bimeType === 2 && (
            <BimeBadaneForm
              customerId={cId}
              bimeId={bimeId}
              onUpdateBime={onUpdateBime}
              handleClose={() => setModal(!modal)}
            />
          )}
        </Container>
      </Dialog>
      <BimeList
        bimeList={bimeList}
        customerId={cId}
        onAddBime={handleAddBime}
        onEditBime={handleEditBime}
        onDeleteBime={handleDeleteBime}
      />

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
