import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from 'App/App.js';
import * as serviceWorker from './App/serviceWorker';
import store from 'App/store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
