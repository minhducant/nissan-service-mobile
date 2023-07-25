import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';

export default {
  getLisVehicleHanding: ({
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
    const url = API.VEHICLE_HANDING.LIST;
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
      //   `In DEV mode params get vehicle handing list: ${JSON.stringify(
      //     params,
      //   )}`,
      // );
    }
    return Axios.get(url, params);
  },
};
