import Axios from '@configs/Axios';
import {getUniqueId} from 'react-native-device-info';
import API from '@configs/API';

export default {
  signIn: ({login, password, firebaseToken}) => {
    const url = API.AUTH.LOGIN;
    const params = {
      login,
      password,
      device_id: getUniqueId(),
      // type: 'odoo',
      debug: 1,
      // firebase_token: firebaseToken,
    };
    // if (__DEV__) {
    //   console.log(JSON.stringify(params));
    // }
    return Axios.post(url, params);
  },
  signUp: ({name, email, password}) => {
    const url = '/sign_up';
    return Axios.post(url, {
      name,
      email,
      password,
      device_id: getUniqueId(),
    });
  },
  forgotPassword: ({email}) => {
    const url = '/forgot_password';
    return Axios.post(url, {
      email,
    });
  },
  signOut: (accessToken) => {
    const url = '/sign_out';
    return Axios.post(url, {
      access_token: accessToken,
    });
  },
};
