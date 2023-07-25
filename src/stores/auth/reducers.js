import AUTH_ACTION from './actionTypes';

const initialState = {
  isLogin: false,
  user: {},
  accessToken: '',
};

const authReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case AUTH_ACTION.SET_LOGIN:
      return {...state, isLogin: payload};
    case AUTH_ACTION.SET_USER:
      return {...state, user: payload};
    case AUTH_ACTION.SET_ACCESS_TOKEN:
      return {...state, accessToken: payload};
    default:
      return state;
  }
};

export default authReducer;
