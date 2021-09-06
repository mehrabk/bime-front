import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/authActions';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE_SUCCESS:
      return { user: action.user };
    case AUTHENTICATE_FAIL:
      return { error: action.error };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}
