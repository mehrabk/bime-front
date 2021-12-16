import configureStore from 'config/configureStore';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk];

const store = createStore(
  configureStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
