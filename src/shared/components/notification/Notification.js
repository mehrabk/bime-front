import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';

export default function Notification(props) {
  const { showNotification, onCloseNotification } = props;
  return (
    <Snackbar
      autoHideDuration={6000}
      open={showNotification.isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={onCloseNotification}>
      <Alert severity={showNotification.type} onClose={onCloseNotification}>
        {showNotification.message}
      </Alert>
    </Snackbar>
  );
}
