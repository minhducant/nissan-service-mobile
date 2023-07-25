import Axios from '@configs/Axios';

export default {
  getListDocuments: ({accessToken, ADMIN, name}) => {
    const url = '/document/list';
    let dataBody = {
      admin: ADMIN,
      access_token: accessToken,
    };
    if (name) {
      dataBody.name = name;
    }
    console.log(dataBody);
    return Axios.get(url, dataBody);
  },
};
