import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { request } from 'shared/helpers/APIUtils';
import { ScaleLoader } from 'react-spinners';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Input
} from '@material-ui/core';
import BlockUi from 'react-block-ui';
import { PhoneNumberVerifier } from 'shared/helpers/NumberFormatInput';
import Notification from 'shared/components/notification/Notification';
import { NumberVerifier } from 'shared/helpers/NumberFormatInput';
import { useCustomerItem } from 'shared/hooks/CustomerHooks';

const VALIDATION_SCHEMA = yup.object().shape({
  userName: yup.string().required('ضروری'),
  lastName: yup.string().required('ضروری'),
  address: yup.string().required('ضروری'),
  phoneNumber: yup
    .string()
    .min(11, 'شماره تماس ۱۱ رقمی است')
    .max(11, 'شماره تماس ۱۱ رقمی است')
    .required('ضروری'),
  nationalCode: yup
    .string()
    .min(10, 'کد ملی ۱۰ رقمی است')
    .max(10, 'کد ملی ۱۰ رقمی است')
    .required('ضروری')
});

const FormImp = ({ methods, customerItem }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          size="small"
          autoFocus
          margin="dense"
          label="نام"
          name="userName"
          fullWidth
          inputRef={methods.register}
          defaultValue={customerItem?.userName}
          error={methods?.errors?.userName?.message}
          helperText={methods?.errors?.userName?.message}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          size="small"
          margin="dense"
          label="نام خانوادگی"
          name="lastName"
          fullWidth
          inputRef={methods.register}
          defaultValue={customerItem?.lastName}
          error={methods?.errors?.lastName?.message}
          helperText={methods?.errors?.lastName?.message}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          variant="outlined"
          autoComplete="off"
          size="small"
          margin="dense"
          label="آدرس"
          name="address"
          fullWidth
          inputRef={methods.register}
          defaultValue={customerItem?.address}
          error={methods?.errors?.address?.message}
          helperText={methods?.errors?.address?.message}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          autoComplete="off"
          onChange={(e) =>
            methods.setValue('phoneNumber', PhoneNumberVerifier(e.target.value))
          }
          variant="outlined"
          size="small"
          margin="dense"
          fullWidth
          label="شماره موبایل"
          placeholder="0911-111-1111"
          name="phoneNumber"
          inputRef={methods.register}
          defaultValue={customerItem?.phoneNumber}
          error={methods?.errors?.phoneNumber?.message}
          helperText={methods?.errors?.phoneNumber?.message}
        />
      </Grid>
      <Grid item xs={12} md={6} lg={6} xl={6}>
        <TextField
          autoComplete="off"
          onChange={(e) =>
            methods.setValue('nationalCode', NumberVerifier(e.target.value))
          }
          variant="outlined"
          size="small"
          margin="dense"
          fullWidth
          label="شماره ملی"
          name="nationalCode"
          inputRef={methods.register}
          defaultValue={customerItem?.nationalCode}
          error={methods?.errors?.nationalCode?.message}
          helperText={methods?.errors?.nationalCode?.message}
        />
      </Grid>
    </Grid>
  );
};

export default function CustomerEdit(props) {
  const { customerId, onUpdateCustomer, onCloseModal } = props;
  const methods = useForm({
    resolver: yupResolver(VALIDATION_SCHEMA)
  });
  const [customerItem, { errorMsg, isLoading }] = useCustomerItem(customerId);
  const [saving, setSaving] = useState(false);
  const [showNotification, setShowNotification] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  useEffect(() => {
    if (errorMsg && errorMsg !== '') {
      setShowNotification({
        isOpen: true,
        message: errorMsg,
        type: 'error'
      });
    }
  }, [errorMsg]);

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      const response = await request().post('/customer/save', {
        ...data,
        id: customerId
      });
      onUpdateCustomer(response.data);
      onCloseModal();
    } catch (error) {
      console.log(error);
      setShowNotification({
        isOpen: true,
        message: 'ذخیره سازی مشتری انجام نشد',
        type: 'error'
      });
    }
    setSaving(false);
  };

  return (
    <>
      <BlockUi
        blocking={saving || (isLoading && customerId > 0)}
        loader={
          <ScaleLoader
            color={'var(--success)'}
            loading={saving || (isLoading && customerId > 0)}
          />
        }
        tag="div">
        <DialogContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {!isLoading && customerItem && customerId > 0 && (
              <FormImp methods={methods} customerItem={customerItem} />
            )}
            {isLoading && !customerItem && customerId === 0 && (
              <FormImp methods={methods} />
            )}
            <DialogActions>
              <Button
                type="submit"
                variant="contained"
                className="m-2 btn-success">
                ذخیره
              </Button>
              <Button
                onClick={onCloseModal}
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
