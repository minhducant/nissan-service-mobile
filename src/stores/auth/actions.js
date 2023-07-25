import AUTH_ACTION from './actionTypes';

export const setLogin = (payload) => {
  return {
    type: AUTH_ACTION.SET_LOGIN,
    payload,
  };
};
export const setUser = (payload) => {
  return {
    type: AUTH_ACTION.SET_USER,
    payload,
  };
};
export const setToken = (payload) => {
  return {
    type: AUTH_ACTION.SET_ACCESS_TOKEN,
    payload,
  };
};
