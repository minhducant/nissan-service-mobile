import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';

export default {
  getListProgress: ({
    fromDate,
    toDate,
    state,
    licensePlate,
    customerName,
    page,
    itemsPerPage,
    adviserName,
  }) => {
    const newFromDate = moment(fromDate, VN_FORMAT_DATE);
    const newToDate = moment(toDate, VN_FORMAT_DATE);
    const url = API.PROGRESS.LIST;
    const params = {
      date_from: newFromDate.format(GL_FORMAT_DATE),
      date_to: newToDate.format(GL_FORMAT_DATE),
    };
    if (state) {
      params.state = state;
    }
    if (licensePlate) {
      params.license_plate = licensePlate;
    }
    if (customerName) {
      params.customer_name = customerName;
    }
    if (page) {
      params.page = page;
    }
    if (itemsPerPage) {
      params.items_per_page = itemsPerPage;
    }
    if (adviserName) {
      params.adviser_name = adviserName;
    }
    // DEV mode
    if (__DEV__) {
      console.log(`In DEV mode get progress list: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },

  getListEmployee: ({accessToken}) => {
    const url = API.EMPLOYEE.LIST;
    const params = {
      access_token: accessToken,
    };
    return Axios.get(url, params);
  },
};
