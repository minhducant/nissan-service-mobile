import moment from 'moment';

import Axios from '@configs/Axios';
import {GL_FORMAT_DATE, VN_FORMAT_DATE} from '@configs/Configs';
import API from '@configs/API';

export default {
  getListAverage: ({startDate, endDate, companyId}) => {
    const url = '/reports/average_revenue';
    const params = {
      date_from: startDate,
      date_to: endDate,
      company_id: companyId,
    };
    // console.log('TCL: params', params);
    return Axios.get(url, params);
  },
  getListServices: ({startDate, endDate, type, companyId}) => {
    const url = '/reports/services_revenue';
    const params = {
      date_from: startDate,
      date_to: endDate,
      type: type,
      company_id: companyId,
    };
    // console.log('TCL: params', params);
    return Axios.get(url, params);
  },
  getListAdviserCar: ({startDate, endDate, type, companyId}) => {
    const url = '/reports/adviser';
    const params = {
      date_from: startDate,
      date_to: endDate,
      type: type,
      company_id: companyId,
    };
    return Axios.get(url, params);
  },
  getListAverageCar: ({startDate, endDate, companyId}) => {
    const url = '/reports/services_average';
    const params = {
      date_from: startDate,
      date_to: endDate,
      company_id: companyId,
    };
    return Axios.get(url, params);
  },
  getListServiceCar: ({startDate, endDate, type, companyId}) => {
    const url = '/reports/services';
    const params = {
      date_from: startDate,
      date_to: endDate,
      type: type,
      company_id: companyId,
    };
    // console.log('params service car', JSON.stringify(params));
    return Axios.get(url, params);
  },
  getListAppointment: ({startDate, endDate, type, companyId}) => {
    const url = '/reports/appointments';
    const params = {
      date_from: startDate,
      date_to: endDate,
      type: type,
      company_id: companyId,
    };
    return Axios.get(url, params);
  },
  getListFleetTask: ({startDate, endDate, companyId}) => {
    const url = '/reports/fleet_task';
    const params = {
      date_from: startDate,
      date_to: endDate,
      company_id: companyId,
    };
    return Axios.get(url, params);
  },
  getListPaymentObject: ({startDate, endDate, companyId}) => {
    const url = '/reports/payment_object';
    const params = {
      date_from: startDate,
      date_to: endDate,
      company_id: companyId,
    };
    // console.log('params', JSON.stringify(params));
    return Axios.get(url, params);
  },
  getListCompany: () => {
    return Axios.get(API.CONFIGURE.COMPANY);
  },
};
