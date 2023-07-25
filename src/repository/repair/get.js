import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';

export default {
  getListRepairOrders: ({
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
    const url = '/fleet/list';
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
      // console.log(
      //   `In DEV mode params get reception list: ${JSON.stringify(params)}`,
      // );
    }
    return Axios.get(url, params);
  },
  getDetailRepairOrder: ({
    accessToken: accessToken,
    repair_order_id: repair_order_id,
  }) => {
    const url = '/fleet/detail';
    const params = {
      access_token: accessToken,
      repair_order_id: repair_order_id,
    };
    if (__DEV__) {
      // console.log(
      //   `In DEV mode params getDetailRepairOrder: ${JSON.stringify(params)}`,
      // );
    }
    return Axios.get(url, params);
  },
  getTechnical: ({accessToken: accessToken, company_id: company_id}) => {
    const url = '/fleet/technical';
    const params = {
      access_token: accessToken,
      company_id: company_id,
    };
    if (__DEV__) {
      // console.log(
      //   `In DEV mode params get reception list: ${JSON.stringify(params)}`,
      // );
    }
    return Axios.get(url, params);
  },
};
