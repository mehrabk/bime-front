import { combineReducers } from 'redux';
import reducers from 'redux/reducers/index';

export default combineReducers({
  ...reducers
});
