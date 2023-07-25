import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';

export default {
  searchCustomerByLicensePlate: (licensePlate) => {
    const url = API.CUSTOMER.GET;
    const params = {
      license_plate: licensePlate,
    };
    if (__DEV__) {
      console.log(`In DEV mode get license plate: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
  getListAppointment: ({
    dateFrom,
    dateTo,
    state,
    licensePlate,
    customerName,
    page,
    itemsPerPage,
    branchId,
    adviserName,
  }) => {
    const url = API.APPOINTMENT.LIST;
    const newFromDate = moment(dateFrom, VN_FORMAT_DATE);
    const newToDate = moment(dateTo, VN_FORMAT_DATE);
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
    if (branchId) {
      params.branch_id = branchId;
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
      console.log(
        `In DEV mode get appointment list: ${JSON.stringify(params)}`,
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
  getAppointment: ({accessToken, appointment_id}) => {
    const url = '/appointment/detail';
    const params = {
      access_token: accessToken,
      appointment_id: appointment_id,
    };
    if (__DEV__) {
      console.log(`In DEV mode getAppointment: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
};
