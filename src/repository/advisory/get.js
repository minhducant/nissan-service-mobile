import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';

export default {
  getListAdvisory: () => {
    const url = '/advisory/list';
    return Axios.get(url, {});
  },
};
