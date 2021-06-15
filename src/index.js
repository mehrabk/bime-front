import configureStore from 'config/configureStore';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from 'App/App.js';
import * as serviceWorker from './App/serviceWorker';
// import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const store = configureStore();
ReactDOM.render(
  <Provider store={store}>
    {/* <GoogleReCaptchaProvider
      reCaptchaKey="6LcWuS4bAAAAAGYWbIk7hRrPtINdVZP0lmWRtlhq"
      language="en"
      useRecaptchaNet={true}> */}
    <App />
    {/* </GoogleReCaptchaProvider> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
