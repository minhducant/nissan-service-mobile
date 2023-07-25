import Axios from '@configs/Axios';

export default {
  getListVideo: (accessToken, ADMIN) => {
    const url = '/video_instruction/list';
    let dataBody = {
      admin: ADMIN,
      access_token: accessToken,
    };
    return Axios.get(url, dataBody);
  },
  getImage: (accessToken, ADMIN) => {
    const url = 'image/list';
    let dataBody = {
      admin: ADMIN,
      access_token: accessToken,
    };
    return Axios.get(url, dataBody);
  },
};
