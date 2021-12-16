import {
  AUTHENTICATE_SUCCESS,
  AUTHENTICATE_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../actions/authActions';

const INITIAL_STATE = {
  isSignedIn: null,
  username: null,
  email: null,
  roles: null
};

export default function (state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
    case AUTHENTICATE_SUCCESS:
      return { ...INITIAL_STATE, isSignedIn: true, ...payload };
    case AUTHENTICATE_FAIL:
      return { error: payload };
    case LOGOUT:
      return {
        ...INITIAL_STATE,
        isSignedIn: false,
        username: null,
        email: null,
        roles: null
      };
    default:
      return state;
  }
}
