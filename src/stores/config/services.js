import API from '@configs/API';
import Axios from '@configs/Axios';
export default {
  getAppointmentsFilter: () => {
    const result = Axios.get(API.FILTER.APPOINTMENT_FILTER);
    return result;
  },
  getReceptionsFilter: () => {
    const result = Axios.get(API.FILTER.RECEPTION_FILTER);
    return result;
  },
  getQuotationsFilter: () => {
    const result = Axios.get(API.FILTER.QUOTATION_FILTER);
    return result;
  },
  getProgressFilter: () => {
    const result = Axios.get(API.FILTER.PROGRESS_FILTER);
    return result;
  },
  getVehicleHandingFilter: () => {
    const result = Axios.get(API.FILTER.HANDING_VEHICLE_FILTER);
    return result;
  },
  getRequestTypes: () => {
    const result = Axios.get(API.CONFIGURE.REQUEST_TYPES);
    return result;
  },
  getCheckListTypes: () => {
    const result = Axios.get(API.FILTER.CHECK_LIST_TYPE);
    return result;
  },
  getListBrand: () => {
    const result = Axios.get(API.CONFIGURE.VEHICLE_MODEL_BRAND);
    return result;
  },
  getListModel: () => {
    const result = Axios.get(API.CONFIGURE.VEHICLE_MODEL);
    return result;
  },
  getListCountry: () => {
    const result = Axios.get(API.CONFIGURE.COUNTRY);
    return result;
  },
  getListProvince: () => {
    const result = Axios.get(API.CONFIGURE.COUNTRY_STATE);
    return result;
  },
  getListDistrict: () => {
    const result = Axios.get(API.CONFIGURE.COUNTRY_DISTRICT);
    return result;
  },
  getListWard: () => {
    const result = Axios.get(API.CONFIGURE.COUNTRY_WARD);
    return result;
  },
  getCheckList: () => {
    const result = Axios.get(API.CONFIGURE.CHECK_LIST);
    return result;
  },
};
