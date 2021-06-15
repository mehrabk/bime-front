import { createStore, combineReducers } from 'redux';
import reducers from 'redux/reducers';

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers
    }),
    {}
  );
}
