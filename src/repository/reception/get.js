import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';

export default {
  getListReception: ({
    dateFrom,
    dateTo,
    state,
    licensePlate,
    customerName,
    page = 1,
    itemsPerPage = 12,
    adviserName,
  }) => {
    const newFromDate = moment(dateFrom, VN_FORMAT_DATE);
    const newToDate = moment(dateTo, VN_FORMAT_DATE);
    const url = API.RECEPTION.LIST;
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

    if (__DEV__) {
      console.log(
        `In DEV mode params get reception list: ${JSON.stringify(params)}`,
      );
    }
    return Axios.get(url, params);
  },
  getDetail: ({receptionId}) => {
    const url = API.RECEPTION.DETAIL;
    const params = {
      reception_id: receptionId,
    };
    if (__DEV__) {
      console.log(
        `In DEV mode params get reception detail: ${JSON.stringify(params)}`,
      );
    }
    return Axios.get(url, params);
  },
  getAdviser: ({accessToken, company_id}) => {
    const url = '/adviser/list';
    const params = {
      access_token: accessToken,
      company_id: company_id,
    };
    if (__DEV__) {
      console.log(`In DEV mode getAdviser: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
};
