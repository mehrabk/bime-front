import JalaliUtils from '@date-io/jalaali';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Card,
  Collapse,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
  Tooltip
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import CloseTwoToneIcon from '@material-ui/icons/CloseTwoTone';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import Alert from '@material-ui/lab/Alert';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import clsx from 'clsx';
import moment from 'moment';
import jMoment from 'moment-jalaali';
import React, { useCallback, useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import { useDropzone } from 'react-dropzone';
import { useFieldArray, useForm } from 'react-hook-form';
import { ScaleLoader } from 'react-spinners';
import Notification from 'shared/components/notification/Notification';
import { PUBLIC_FOLDER_PATH, request } from 'shared/helpers/APIUtils';
import { NumberVerifier } from 'shared/helpers/NumberFormatInput';
import { useGhestItem } from 'shared/hooks/GhestHooks';
import * as yup from 'yup';

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });

const VALIDATION_SCHEMA = yup.object().shape({
  ghestNumber: yup.string().required('ضروری'),
  ghestDate: yup.string().required('ضروری'),
  ghestPrice: yup.string().required('ضروری'),
  imageUrl: yup.string(),
  note: yup.string().max(300).required('ضرروری')
});

const FormImp = ({ methods, ghestItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [selectedDate, handleDateChange] = useState(moment());
  const [savingImage, setSavingImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState();
  const [showNotification, setShowNotification] = useState({
    isOpen: false,
    message: '',
    type: ''
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: 'imageArray'
  });

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      uploadFile(file);
    });
  }, []);

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps
  } = useDropzone({
    onDrop,
    accept: 'image/*',
    noDragEventsBubbling: true
  });

  const uploadFile = async (file) => {
    let formData = new FormData();
    formData.append('file', file);
    setSavingImage(true);
    try {
      const response = await request().post('/upload', formData);
      append(response.data);
    } catch (error) {
      setErrorMsg(error);
    }
    setSavingImage(false);
  };

  console.log(fields);

  useEffect(() => {
    if (errorMsg && errorMsg !== '') {
      setShowNotification({
        isOpen: true,
        message: errorMsg,
        type: 'error'
      });
    }
  }, [errorMsg]);

  useEffect(() => {
    if (ghestItem && ghestItem.imageUrl && ghestItem.imageUrl.length > 0) {
      append(JSON.parse(ghestItem.imageUrl));
    }
  }, []);

  const thumbs = fields.map((item, index) => (
    <Grid item md={3} className="p-2" key={item.id}>
      <div className="text-center">
        <Tooltip title="حذف">
          <IconButton onClick={() => remove(index)} aria-label="delete">
            <DeleteForeverTwoToneIcon color="error" />
          </IconButton>
        </Tooltip>
      </div>
      <div className="p-2 bg-white shadow-xxl border-dark card-box d-flex overflow-hidden rounded-sm">
        <img
          className="img-fluid img-fit-container rounded-sm"
          src={`${PUBLIC_FOLDER_PATH}img/upload/${item.src}`}
          // src={`${API_ADDRESS}/upload/${item.fileName}`}
          alt="Logo"
        />
      </div>
    </Grid>
  ));

  console.log(fields);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            variant="outlined"
            autoComplete="off"
            onChange={(e) =>
              methods.setValue('ghestNumber', NumberVerifier(e.target.value))
            }
            size="small"
            autoFocus
            margin="dense"
            label="شماره قسط"
            name="ghestNumber"
            fullWidth
            inputRef={methods.register}
            defaultValue={ghestItem?.ghestNumber}
            error={methods?.errors?.ghestNumber?.message}
            helperText={methods?.errors?.ghestNumber?.message}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            variant="outlined"
            autoComplete="off"
            onChange={(e) =>
              methods.setValue('ghestPrice', NumberVerifier(e.target.value))
            }
            size="small"
            margin="dense"
            label="مبلغ قسط"
            name="ghestPrice"
            fullWidth
            inputRef={methods.register}
            defaultValue={ghestItem?.ghestPrice}
            error={methods?.errors?.ghestPrice?.message}
            helperText={methods?.errors?.ghestPrice?.message}
          />
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DatePicker
              label="تاریخ واریز قسط"
              clearable
              inputVariant="outlined"
              variant="dialog"
              fullWidth
              name="ghestDate"
              inputRef={methods.register}
              okLabel="تأیید"
              cancelLabel="لغو"
              clearLabel="پاک کردن"
              labelFunc={(date) => (date ? date.format('jYYYY/jMM/jDD') : '')}
              value={selectedDate}
              onChange={handleDateChange}
              error={methods?.errors?.ghestDate?.message}
              helperText={methods?.errors?.ghestDate?.message}
            />
          </MuiPickersUtilsProvider>
        </Grid>

        <Grid item xs={12} md={6} lg={6} xl={6}>
          <TextField
            multiline
            rowsMax={7}
            variant="outlined"
            autoComplete="off"
            size="small"
            margin="dense"
            label="یادداشت"
            name="note"
            fullWidth
            inputRef={methods.register}
            defaultValue={ghestItem?.note}
            error={methods?.errors?.note?.message}
            helperText={methods?.errors?.note?.message}
          />
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <input
            hidden
            name="imageUrl"
            ref={methods.register}
            onChange={(e) => console.log(e)}
            value={fields && fields.length > 0 ? JSON.stringify(fields) : ''}
          />
          <div className="accordion mb-spacing-6-x2">
            <Card className={clsx('card-box', { 'panel-open': isOpen })}>
              <Card>
                <div className="card-header">
                  <div className="panel-title">
                    <div className="accordion-toggle">
                      <Button
                        variant="text"
                        size="large"
                        className="btn-link d-flex align-items-center justify-content-between btn-transition-none"
                        onClick={toggle}>
                        <span>بارگذاری مدارک</span>
                        <FontAwesomeIcon
                          icon={['fas', 'angle-up']}
                          className="font-size-xl accordion-icon text-right"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <Collapse in={isOpen}>
                  <div className="p-4">
                    <Grid container spacing={6}>
                      <Grid item lg={12}>
                        <div className="dropzone">
                          <div
                            {...getRootProps({
                              className: 'dropzone-upload-wrapper'
                            })}>
                            <input {...getInputProps()} />
                            <div className="dropzone-inner-wrapper dropzone-inner-wrapper-alt">
                              {isDragAccept && (
                                <div>
                                  <div className="d-30 btn-icon mb-3 hover-scale-rounded bg-success shadow-success-sm rounded-lg text-white">
                                    <CheckIcon className="d-50" />
                                  </div>
                                  <div className="font-size-xs text-success">
                                    We're ready to start!
                                  </div>
                                </div>
                              )}
                              {isDragReject && (
                                <div>
                                  <div className="d-30 btn-icon mb-3 hover-scale-rounded bg-danger shadow-danger-sm rounded-lg text-white">
                                    <CloseTwoToneIcon className="d-30" />
                                  </div>
                                  <div className="font-size-xs text-danger">
                                    These files are not images!
                                  </div>
                                </div>
                              )}
                              {!isDragActive && (
                                <div>
                                  <div className="d-30 btn-icon mb-3 hover-scale-rounded bg-white shadow-light-sm rounded-lg text-first">
                                    <CloudUploadTwoToneIcon className="d-50" />
                                  </div>
                                  <div className="font-size-sm">
                                    Drag and drop images here
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="card-footer p-3 bg-secondary">
                    <div>
                      <div className="font-weight-bold mb-3 text-uppercase text-dark font-size-sm text-center">
                        عکسهای بارگذاری شده
                      </div>
                      {thumbs.length <= 0 && (
                        <div className="text-first text-center font-size-sm">
                          عکسی بارگذاری نشده است!
                        </div>
                      )}
                      {thumbs.length > 0 && (
                        <div>
                          <Alert
                            severity="success"
                            className="text-center mb-3">
                            <b>{thumbs.length}</b> عکس بارگذاری شده
                          </Alert>
                          <Grid container spacing={0}>
                            {thumbs}
                          </Grid>
                        </div>
                      )}
                    </div>
                  </div>
                </Collapse>
              </Card>
            </Card>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default function GhestEdit(props) {
  const { bimeId, ghestId, onUpdateGhest, onCloseModal } = props;
  const methods = useForm({ resolver: yupResolver(VALIDATION_SCHEMA) });
  const [ghestItem, { errorMsg, isLoading }] = useGhestItem(ghestId);
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
    data.ghestDate = jMoment(data.ghestDate, 'jYYYY/jMM/jDD').format(
      'YYYY-MM-DD'
    );
    setSaving(true);
    try {
      const response = await request().post(`/ghest/${bimeId}/save`, {
        ...data,
        id: ghestId
      });
      onUpdateGhest(response.data);
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
    setSaving(false);
  };

  return (
    <>
      <BlockUi
        blocking={saving || (isLoading && ghestId > 0)}
        loader={
          <ScaleLoader
            color={'var(--success'}
            loading={saving || (isLoading && ghestId > 0)}
          />
        }>
        <DialogContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {!isLoading && ghestItem && ghestId > 0 && (
              <FormImp methods={methods} ghestItem={ghestItem} />
            )}
            {isLoading && ghestId === 0 && <FormImp methods={methods} />}
            <DialogActions className="d-flex align-items-center justify-content-center">
              <Button type="submit" variant="contained" className="btn-success">
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
