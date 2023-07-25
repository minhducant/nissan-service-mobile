import Axios from '@configs/Axios';
import API from '@configs/API';
export default {
  getStateAndQty: (accessToken) => {
    const body = {
      access_token: accessToken,
    };
    const url = API.SYNTHETIC.STATE_AND_QTY;
    return Axios.get(url, body);
  },
};
