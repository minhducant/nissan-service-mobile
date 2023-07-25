import moment from 'moment';
import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';
export default {
  getListQuotations: ({
    dateFrom,
    dateTo,
    state,
    licensePlate,
    customerName,
    page = 1,
    itemsPerPage = 12,
    branchId,
    adviserName,
  }) => {
    const url = API.QUOTATION.LIST;
    const newFromDate = moment(dateFrom, VN_FORMAT_DATE);
    const newToDate = moment(dateTo, VN_FORMAT_DATE);
    const params = {
      date_from: newFromDate.format(GL_FORMAT_DATE),
      date_to: newToDate.format(GL_FORMAT_DATE),
      page,
      items_per_page: itemsPerPage,
    };
    if (licensePlate) {
      params.license_plate = licensePlate;
    }
    if (adviserName) {
      params.adviser_name = adviserName;
    }
    if (customerName) {
      params.customer_name = customerName;
    }
    if (branchId) {
      params.branch_id = branchId;
    }
    if (state) {
      params.state = state;
    }
    if (__DEV__) {
      console.log(`In DEV mode get quotation list: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
  previewReport: ({id, type}) => {
    const url = API.QUOTATION.REPORT;
    const params = {
      id: id,
      type: type,
    };
    if (__DEV__) {
      console.log(`In DEV mode previewReport: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
  getCarService: ({accessToken, company_id, license_plate}) => {
    const url = '/car/service';
    const params = {
      access_token: accessToken,
      company_id: company_id,
      license_plate: license_plate,
    };
    if (__DEV__) {
      console.log(`In DEV mode getCarService: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
  getDetailQuotation: ({accessToken, quotation_id}) => {
    const url = '/quotation/detail';
    const params = {
      access_token: accessToken,
      quotation_id: quotation_id,
    };
    if (__DEV__) {
      console.log(`In DEV mode getDetailQuotation: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
  getQuotationReport: ({accessToken, quotation_id}) => {
    const url = '/quote/report/print';
    const params = {
      access_token: accessToken,
      quotation_id: quotation_id,
    };
    if (__DEV__) {
      console.log(`In DEV mode getQuotationReport: ${JSON.stringify(params)}`);
    }
    return Axios.get(url, params);
  },
};
