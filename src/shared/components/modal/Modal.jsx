import { Dialog, DialogTitle, Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  dialog: {
    "& .MuiDialog-paperWidthXl": {
      width: "50%",
    },
    "& .MuiDialog-paperScrollPaper": {
      height: "80%",
    },
  },
}));

export default function Modal(props) {
  const { openModal, closeModal, title, children } = props;
  const classes = useStyles();
  return (
    <Dialog
      className={classes.dialog}
      open={openModal}
      maxWidth="xl"
      onClose={closeModal}
    >
      <DialogTitle disableTypography style={{ textAlign: "right" }}>
        <Typography variant="h6">
          {title}
        </Typography>
      </DialogTitle>
      <Divider />
      {children}
    </Dialog>
  );
}
