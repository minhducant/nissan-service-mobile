import axios from 'axios';
import {API_URL} from '@configs/Configs';
import {clearLocalStorage} from '@configs/LocalStorage';
// import {removeUserLogin} from '@configs/Database';
import createStore from '@stores/index';
import {setToken} from '@stores/auth/actions';
const baseURL = API_URL;
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';
const METHOD_PATCH = 'PATCH';

// const setHeaders = async (headers) => {
//   return {
//     ...headers,
//     'Access-Token': createStore.store.getState().auth.accessToken,
//   };
// };

// const AxiosClient = axios.create({
//     baseURL,
//     timeout: 10000,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// AxiosClient.interceptors.response.use(
//     (response) => {
//         if (
//             response &&
//             response.data &&
//             response.data.result &&
//             response.data.result.code === 200
//         ) {
//             return response?.data?.result?.data;
//         } else {
//             removeUserLogin();
//             createStore.dispatch({type: 'SET_USER_LOGOUT'});
//         }
//     },

//     (err) => {
//         if (err.code === 'ECONNABORTED') {
//             throw Error(`timeout and ${AxiosClient.options}`);
//         } else {
//             throw err;
//         }
//     },
// );

const requestAPI = async (method, url, headers = {}, dataBody) => {
  headers['Content-Type'] = headers['Content-Type']
    ? headers['Content-Type']
    : 'application/json';
  headers.accept = 'application/json';
  const accessToken = createStore.store.getState().auth.accessToken;
  if (accessToken) {
    headers['Access-Token'] = accessToken;
  }
  const config = {
    timeout: 10000,
    baseURL,
    url,
    headers,
    method,
  };

  if (method === METHOD_GET) {
    config.params = dataBody;
  } else {
    config.data = dataBody;
  }

  // console.log(config);
  return axios(config)
    .then(async (res) => {
      if (res.data.result.code === 200) {
        return res.data.result;
      } else if (res.data.result.code === 407) {
        await clearLocalStorage();
        createStore.dispatch(setToken(''));
      } else {
        throw res.data.result.message;
      }
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        throw 'Hết thời gian, không thể kết nối!';
      } else {
        // throw 'Lỗi hệ thống!';
        throw JSON.stringify(err);
      }
    });
};

export default {
  get(url, dataBody, headers = {}) {
    return requestAPI(METHOD_GET, url, headers, dataBody);
  },

  post(url, dataBody, headers = {}) {
    return requestAPI(METHOD_POST, url, headers, dataBody);
  },

  put(url, dataBody, headers = {}) {
    return requestAPI(METHOD_PUT, url, headers, dataBody);
  },
  patch(url, dataBody, headers = {}) {
    return requestAPI(METHOD_PATCH, url, headers, dataBody);
  },

  delete(url, dataBody, headers = {}) {
    return requestAPI(METHOD_DELETE, url, headers, dataBody);
  },
};
