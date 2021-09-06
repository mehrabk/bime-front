import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Container, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { auth } from 'redux/actions/authActions';
import { ACCESS_TOKEN, request } from 'shared/helpers/APIUtils';
import * as yup from 'yup';
import hero6 from '../../../assets/images/hero-bg/hero-1.jpg';
import LoginForm from './components/LoginForm';
import LoginIntroduction from './components/LoginIntroduction';

const VALIDATION_SCHEMA = yup.object().shape({
  username: yup.string().required('ضرروری'),
  password: yup.string().required('ضرروری')
});

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const methods = useForm({ resolver: yupResolver(VALIDATION_SCHEMA) });

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    try {
      const response = await request().post('/auth/signin', {
        username,
        password
      });
      localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
      const user = await request().get('/user/me');
      dispatch(auth(user.data));
    } catch (err) {
      localStorage.removeItem(ACCESS_TOKEN);
      console.log(err);
    }
  };

  return (
    <>
      <div className="app-wrapper min-vh-100 bg-white">
        <div className="hero-wrapper w-100 bg-composed-wrapper bg-midnight-bloom min-vh-100">
          <div className="flex-grow-1 w-100 d-flex align-items-center">
            <div
              className="bg-composed-wrapper--image opacity-6"
              style={{ backgroundImage: 'url(' + hero6 + ')' }}
            />
            <div className="bg-composed-wrapper--bg bg-second opacity-7" />
            <div className="bg-composed-wrapper--content p-3 p-md-5">
              <Container>
                <Card className="rounded-sm modal-content p-3 bg-white-10">
                  <Card className="rounded-sm overflow-hidden shadow-xxl font-size-sm p-3 p-sm-0">
                    <Grid container spacing={0}>
                      <Grid
                        item
                        lg={6}
                        className="d-flex align-items-center justify-content-center flex-column">
                        <div className="divider-v divider-v-lg d-none d-lg-block" />
                        <div className="text-center mt-4">
                          <h1 className="font-size-xxl mb-1 font-weight-bold">
                            Login
                          </h1>
                          <p className="mb-0 text-black-50">
                            Fill in the fields below to login to your account
                          </p>
                        </div>
                        <div className="py-4">
                          <div>
                            <form onSubmit={methods.handleSubmit(onSubmit)}>
                              <LoginForm methods={methods} />
                              <div className="text-center py-4">
                                <Button
                                  type="submit"
                                  className="btn-second font-weight-bold w-50 my-2">
                                  Sign in
                                </Button>
                              </div>
                            </form>

                            <div className="text-center text-black-50 mt-3">
                              Don't have an account?{' '}
                              <a
                                className="text-first"
                                href="#/"
                                onClick={(e) => e.preventDefault()}>
                                Sign up
                              </a>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <LoginIntroduction />
                    </Grid>
                  </Card>
                </Card>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
