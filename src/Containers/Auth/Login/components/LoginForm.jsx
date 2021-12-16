import React from 'react';
import { InputAdornment, TextField } from '@material-ui/core';
import MailOutlineTwoToneIcon from '@material-ui/icons/MailOutlineTwoTone';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  alignLeft: {
    '& .MuiInputBase-input': {
      direction: 'rtl !important'
    }
  }
}));
export default function LoginForm({ methods }) {
  const classes = useStyles();
  return (
    <>
      <div className="mb-4">
        <TextField
          fullWidth
          autoComplete="off"
          variant="outlined"
          id="textfield-email"
          label="نام کاربری"
          name="username"
          inputRef={methods.register}
          error={methods?.errors?.username?.message}
          helperText={methods?.errors?.username?.message}
        />
      </div>
      <div className="mb-3">
        <TextField
          fullWidth
          autoComplete="off"
          variant="outlined"
          id="textfield-password"
          label="رمز عبور"
          type="password"
          name="password"
          inputRef={methods.register}
          error={methods?.errors?.password?.message}
          helperText={methods?.errors?.password?.message}
        />
      </div>
    </>
  );
}
