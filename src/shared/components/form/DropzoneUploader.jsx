/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';

const LABEL_PATH = `${process.env.PUBLIC_URL}/img/dropzone/`;

const iconByFn = {
  cancel: { backgroundImage: `url(${LABEL_PATH}cancel.svg)` },
  remove: { backgroundImage: `url(${LABEL_PATH}remove.svg)` },
  restart: { backgroundImage: `url(${LABEL_PATH}restart.svg)` },
  camera: { backgroundImage: `url(${LABEL_PATH}camera.svg)` }
};

const PreviewComponent = ({
  className,
  imageClassName,
  style,
  imageStyle,
  fileWithMeta: { cancel, remove, restart },
  meta: {
    name = '',
    percent = 0,
    size = 0,
    previewUrl,
    status,
    duration,
    validationError
  },
  isUpload,
  canCancel,
  canRemove,
  canRestart,
  extra: { minSizeBytes }
}) => {
  let title = `${name || '?'}, ${size}`;
  if (duration) title = `${title}, ${duration}`;

  if (status === 'error_file_size' || status === 'error_validation') {
    return (
      <div className={className} style={style}>
        <span className="dzu-previewFileNameError">{title}</span>
        {status === 'error_file_size' && (
          <span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>
        )}
        {status === 'error_validation' && (
          <span>{String(validationError)}</span>
        )}
        {canRemove && (
          <span
            className="dzu-previewButton"
            style={iconByFn.remove}
            onClick={remove}
          />
        )}
      </div>
    );
  }

  if (
    status === 'error_upload_params' ||
    status === 'exception_upload' ||
    status === 'error_upload'
  ) {
    title = `${title} (upload failed)`;
  }
  if (status === 'aborted') title = `${title} (cancelled)`;

  return (
    <>
      {status !== 'done' && (
        <div className={className} style={style}>
          {previewUrl && (
            <img
              className={imageClassName}
              style={imageStyle}
              src={previewUrl}
              alt={title}
              title={title}
            />
          )}
          {!previewUrl && <span className="dzu-previewFileName">{title}</span>}

          <div className="dzu-previewStatusContainer">
            {isUpload && (
              <progress
                max={100}
                value={
                  name.includes('attachments') ||
                  status === 'done' ||
                  status === 'headers_received'
                    ? 100
                    : percent
                }
              />
            )}

            {status === 'uploading' && canCancel && (
              <span
                className="dzu-previewButton"
                style={iconByFn.cancel}
                onClick={cancel}
              />
            )}
            {status !== 'preparing' &&
              status !== 'getting_upload_params' &&
              status !== 'uploading' &&
              canRemove && (
                <span
                  className="dzu-previewButton"
                  style={iconByFn.remove}
                  onClick={remove}
                />
              )}
            {[
              'error_upload_params',
              'exception_upload',
              'error_upload',
              'aborted',
              'ready'
            ].includes(status) &&
              canRestart &&
              !name.includes('attachments') && (
                <span
                  className="dzu-previewButton"
                  style={iconByFn.restart}
                  onClick={restart}
                />
              )}
          </div>
        </div>
      )}
    </>
  );
};

PreviewComponent.propTypes = {
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  style: PropTypes.shape(),
  imageStyle: PropTypes.shape(),
  fileWithMeta: PropTypes.shape({
    file: PropTypes.any.isRequired,
    meta: PropTypes.object.isRequired,
    cancel: PropTypes.func.isRequired,
    restart: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    xhr: PropTypes.any
  }).isRequired,
  // copy of fileWithMeta.meta, won't be mutated
  meta: PropTypes.shape({
    status: PropTypes.oneOf([
      'preparing',
      'error_file_size',
      'error_validation',
      'ready',
      'getting_upload_params',
      'error_upload_params',
      'uploading',
      'exception_upload',
      'aborted',
      'error_upload',
      'headers_received',
      'done'
    ]).isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    uploadedDate: PropTypes.string.isRequired,
    percent: PropTypes.number,
    size: PropTypes.number,
    lastModifiedDate: PropTypes.string,
    previewUrl: PropTypes.string,
    duration: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
    videoWidth: PropTypes.number,
    videoHeight: PropTypes.number,
    validationError: PropTypes.any
  }).isRequired,
  isUpload: PropTypes.bool.isRequired,
  canCancel: PropTypes.bool.isRequired,
  canRemove: PropTypes.bool.isRequired,
  canRestart: PropTypes.bool.isRequired,
  files: PropTypes.arrayOf(PropTypes.any).isRequired, // eslint-disable-line react/no-unused-prop-types
  extra: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    reject: PropTypes.bool.isRequired,
    dragged: PropTypes.arrayOf(PropTypes.any).isRequired,
    accept: PropTypes.string.isRequired,
    multiple: PropTypes.bool.isRequired,
    minSizeBytes: PropTypes.number.isRequired,
    maxSizeBytes: PropTypes.number.isRequired,
    maxFiles: PropTypes.number.isRequired
  }).isRequired
};

const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles }
}) => (
  <div className="dzu-frame">
    {previews}
    <div {...dropzoneProps}>{files.length < maxFiles && input}</div>
    {files.length > 0 && submitButton}
  </div>
);

Layout.propTypes = {
  input: PropTypes.func.isRequired,
  previews: PropTypes.func.isRequired,
  submitButton: PropTypes.func.isRequired,
  dropzoneProps: PropTypes.func.isRequired,
  files: PropTypes.shape().isRequired,
  extra: PropTypes.shape({
    maxFiles: PropTypes.number.isRequired
  }).isRequired
};
const DropZoneInput = ({ accept, onFiles, getFilesFromEvent }) => (
  <label htmlFor="catalog">
    <span style={iconByFn.camera} className="dzu-add-camera" />
    <input
      style={{
        position: 'absolute',
        zIndex: 2,
        height: '100%',
        width: '100%',
        opacity: 0,
        right: 0,
        cursor: 'pointer'
      }}
      type="file"
      name="catalog"
      accept={accept}
      multiple
      onChange={(e) => {
        getFilesFromEvent(e).then((chosenFiles) => {
          onFiles(chosenFiles);
        });
      }}
    />
  </label>
);

DropZoneInput.propTypes = {
  accept: PropTypes.func.isRequired,
  onFiles: PropTypes.func.isRequired,
  getFilesFromEvent: PropTypes.func.isRequired
};

function DropzoneUploader(props) {
  const {
    uploadParams,
    accept,
    label,
    initialValue,
    name,
    onChange,
    maxFiles,
    maxFileSize
  } = props;

  function getFilesFromEvent(e) {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(chosenFiles.map((f) => f.fileObject));
      });
    });
  }

  function handleChangeStatus(fileWithMeta, status) {
    const { xhr } = fileWithMeta;
    if (status === 'done' && xhr) {
      onChange(fileWithMeta, status, xhr);
    } else if (status === 'removed' && xhr) {
      onChange(fileWithMeta, status, xhr);
    } else if (status === 'rejected_file_type') {
      onChange(fileWithMeta, status, xhr);
    } else if (
      status === 'error_upload' &&
      !fileWithMeta.meta.name.includes('attachments')
    ) {
      onChange(fileWithMeta, status, xhr);
    } else if (status === 'started') {
      onChange(fileWithMeta, status, xhr);
    } else if (
      status === 'ready' &&
      !fileWithMeta.meta.name.includes('attachments')
    ) {
      fileWithMeta.restart();
    } else if (
      status === 'ready' &&
      fileWithMeta.meta.name.includes('attachments')
    ) {
      fileWithMeta.cancel();
    }
  }

  return (
    <div className="form-catalog">
      <div className="form__form-group div-catalog">
        <span className="form__form-group-label">{label}</span>
        <div className="form__form-group-field">
          <Dropzone
            name={name}
            label={label}
            {...props}
            getUploadParams={uploadParams}
            onChangeStatus={(file, status, files) => {
              handleChangeStatus(file, status, files);
            }}
            accept={accept}
            PreviewComponent={PreviewComponent}
            LayoutComponent={Layout}
            InputComponent={DropZoneInput}
            getFilesFromEvent={getFilesFromEvent}
            classNames={{ inputLabelWithFiles: Dropzone.inputLabel }}
            initialFiles={initialValue}
            maxFiles={maxFiles}
            maxSizeBytes={maxFileSize}
            // validate={validate}
            autoUpload={false}
            submitButtonDisabled
          />
        </div>
      </div>
    </div>
  );
}

DropzoneUploader.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  uploadParams: PropTypes.func.isRequired,
  initialValue: PropTypes.arrayOf(PropTypes.object),
  // validate: PropTypes.func,
  accept: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxFiles: PropTypes.number,
  maxFileSize: PropTypes.number
};

DropzoneUploader.defaultProps = {
  label: '',
  maxFiles: 1,
  maxFileSize: 1024 * 1024 * 200
  // validate: false,
};

export default DropzoneUploader;
