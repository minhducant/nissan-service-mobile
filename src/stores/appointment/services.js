import API from '@configs/API';
import Axios from '@configs/Axios';

export default {
  getCheckList: () => {
    const result = Axios.get(API.CONFIGURE.CHECK_LIST);
    return result;
  },
};
