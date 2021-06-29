import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField
} from '@material-ui/core';
import { ScaleLoader } from 'react-spinners';
import BlockUi from 'react-block-ui';
import { NumberVerifier } from '../../../shared/helpers/NumberFormatInput';
import { request } from 'shared/helpers/APIUtils';
import Notification from 'shared/components/notification/Notification';
import { useBimeItem } from 'shared/hooks/BimeHooks';

import moment from 'moment';
import jMoment from 'moment-jalaali';
import JalaliUtils from '@date-io/jalaali';
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

const VALIDATION_SCHEMA = yup.object().shape({
  bimeNumber: yup.string().required('ضروری'),
  yektaCode: yup.string().required('ضروری'),
  ghestCount: yup
    .number()
    .min(1, 'کمتر از ۱ قسط مجاز نیست')
    .max(10, 'بیشتر از ۱۰ قسط مجاز نیست')
    .required('ضروری'),
  contractDate: yup.string().required('ضروری'),
  totalPrice: yup.string().required('ضروری'),
  pishPardakht: yup.string().required('ضروری'),
  note: yup.string().required('ضروری')
});

const FormImp = ({ methods, bimeItem }) => {
  const [selectedDate, handleDateChange] = useState(moment());
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          size="small"
          autoFocus
          margin="dense"
          label="شماره بیمه"
          name="bimeNumber"
          fullWidth
          {...methods.register('bimeNumber')}
          defaultValue={bimeItem && bimeItem.bimeNumber}
          error={
            methods.errors &&
            methods.errors.bimeNumber &&
            methods.errors.bimeNumber.message
          }
          helperText={
            methods.errors &&
            methods.errors.bimeNumber &&
            methods.errors.bimeNumber.message
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          onChange={(e) =>
            methods.setValue('yektaCode', NumberVerifier(e.target.value))
          }
          size="small"
          margin="dense"
          label="کد یکتا"
          name="yektaCode"
          fullWidth
          {...methods.register('yektaCode')}
          defaultValue={bimeItem && bimeItem.yektaCode}
          error={
            methods.errors &&
            methods.errors.yektaCode &&
            methods.errors.yektaCode.message
          }
          helperText={
            methods.errors &&
            methods.errors.yektaCode &&
            methods.errors.yektaCode.message
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          onChange={(e) =>
            methods.setValue('ghestCount', NumberVerifier(e.target.value))
          }
          size="small"
          margin="dense"
          label="تعداد قسط"
          name="ghestCount"
          fullWidth
          {...methods.register('ghestCount')}
          defaultValue={bimeItem && bimeItem.ghestCount}
          error={
            methods.errors &&
            methods.errors.ghestCount &&
            methods.errors.ghestCount.message
          }
          helperText={
            methods.errors &&
            methods.errors.ghestCount &&
            methods.errors.ghestCount.message
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
          <DatePicker
            clearable
            inputVariant="outlined"
            variant="dialog"
            fullWidth
            name="contractDate"
            {...methods.register('contractDate')}
            okLabel="تأیید"
            cancelLabel="لغو"
            clearLabel="پاک کردن"
            labelFunc={(date) => (date ? date.format('jYYYY/jMM/jDD') : '')}
            value={selectedDate}
            onChange={handleDateChange}
            error={
              methods.errors &&
              methods.errors.contractDate &&
              methods.errors.contractDate.message
            }
            helperText={
              methods.errors &&
              methods.errors.contractDate &&
              methods.errors.contractDate.message
            }
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          onChange={(e) =>
            methods.setValue('totalPrice', NumberVerifier(e.target.value))
          }
          size="small"
          margin="dense"
          label="مبلغ کل"
          name="totalPrice"
          fullWidth
          {...methods.register('totalPrice')}
          defaultValue={bimeItem && bimeItem.totalPrice}
          error={
            methods.errors &&
            methods.errors.totalPrice &&
            methods.errors.totalPrice.message
          }
          helperText={
            methods.errors &&
            methods.errors.totalPrice &&
            methods.errors.totalPrice.message
          }
        />
      </Grid>

      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          onChange={(e) =>
            methods.setValue('pishPardakht', NumberVerifier(e.target.value))
          }
          size="small"
          margin="dense"
          label="پیش پرداخت"
          name="pishPardakht"
          fullWidth
          {...methods.register('pishPardakht')}
          defaultValue={bimeItem && bimeItem.pishPardakht}
          error={
            methods.errors &&
            methods.errors.pishPardakht &&
            methods.errors.pishPardakht.message
          }
          helperText={
            methods.errors &&
            methods.errors.pishPardakht &&
            methods.errors.pishPardakht.message
          }
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          size="small"
          margin="dense"
          label="توضیحات"
          name="note"
          fullWidth
          {...methods.register('note')}
          defaultValue={bimeItem && bimeItem.note}
          error={
            methods.errors && methods.errors.note && methods.errors.note.message
          }
          helperText={
            methods.errors && methods.errors.note && methods.errors.note.message
          }
        />
      </Grid>
    </Grid>
  );
};

export default function BimeSalesForm(props) {
  const { customerId, bimeId, onUpdateBime, handleClose } = props;
  const methods = useForm({ resolver: yupResolver(VALIDATION_SCHEMA) });
  const [saving, setSaving] = useState(false);
  const [bimeItem, { errorMsg, isLoading }] = useBimeItem(bimeId);
  const [showNotification, setShowNotification] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  const onSubmit = async (data) => {
    data.contractDate = jMoment(data.contractDate, 'jYYYY/jMM/jDD').format(
      'YYYY-MM-DD'
    );
    console.log('data == > ', data);
    setSaving(true);
    try {
      const response = await request().post(`/customer/${customerId}/addBime`, {
        ...data,
        id: bimeId,
        type: 1
      });
      onUpdateBime(response.data);
      handleClose();
    } catch (error) {
      console.log(error);
      setShowNotification({
        isOpen: true,
        message: 'ذخیره سازی بیمه ثالث انجام نشد',
        type: 'error'
      });
    }
    setSaving(false);
  };

  useEffect(() => {
    if (errorMsg && errorMsg !== '') {
      setShowNotification({
        isOpen: true,
        message: errorMsg,
        type: 'error'
      });
    }
  }, [errorMsg]);

  console.log('bimeSalesForm ====>', isLoading);
  return (
    <>
      <BlockUi
        blocking={saving || (isLoading && bimeId > 0)}
        loader={
          <ScaleLoader
            color={'var(--success)'}
            loading={saving || (isLoading && bimeId > 0)}
          />
        }
        tag="div">
        <DialogContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {!isLoading && bimeItem && bimeId > 0 && (
              <FormImp methods={methods} bimeItem={bimeItem} />
            )}
            {isLoading && <FormImp methods={methods} />}
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                ذخیره
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="secondary">
                انصراف
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </BlockUi>

      <Notification
        showNotification={showNotification}
        onClose={() =>
          setShowNotification({ isOpen: false, message: '', type: '' })
        }
      />
    </>
  );
}
