import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

export default function Notification(props) {

    const {showNotification, onClose} = props
    return (
        <Snackbar
            open={showNotification.isOpen}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={onClose}
            >
            <Alert
                severity={showNotification.type}
                onClose={onClose}
                >
                {showNotification.message}
            </Alert>
        </Snackbar>
    )
}
