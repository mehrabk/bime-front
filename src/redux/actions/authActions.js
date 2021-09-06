export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export function auth(user) {
  return {
    type: AUTHENTICATE_SUCCESS,
    user
  };
}

export function authError(error) {
  return {
    type: AUTHENTICATE_FAIL,
    error
  };
}

export function setLogout() {
  return {
    type: LOGOUT
  };
}
