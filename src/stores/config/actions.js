import CONFIG_ACTION from './actionTypes';
export const setLoading = (payload) => {
  return {
    type: CONFIG_ACTION.SET_LOADING,
    payload,
  };
};
// get appointment filter
export const getAppointmentsFilter = () => {
  return {
    type: CONFIG_ACTION.GET_APPOINTMENT_FILTER,
  };
};
export const getAppointmentsFilterSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_APPOINTMENT_FILTER_SUCCESS,
    payload,
  };
};
export const getAppointmentsFilterFailure = () => {
  return {
    type: CONFIG_ACTION.GET_APPOINTMENT_FILTER_FAILURE,
  };
};
// get reception filter
export const getReceptionsFilter = () => {
  return {
    type: CONFIG_ACTION.GET_RECEPTION_FILTER,
  };
};
export const getReceptionsFilterSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_RECEPTION_FILTER_SUCCESS,
    payload,
  };
};
export const getReceptionsFilterFailure = () => {
  return {
    type: CONFIG_ACTION.GET_RECEPTION_FILTER_FAILURE,
  };
};
// get quotation filter
export const getQuotationsFilter = () => {
  return {
    type: CONFIG_ACTION.GET_QUOTATION_FILTER,
  };
};
export const getQuotationsFilterSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_QUOTATION_FILTER_SUCCESS,
    payload,
  };
};
export const getQuotationsFilterFailure = () => {
  return {
    type: CONFIG_ACTION.GET_QUOTATION_FILTER_FAILURE,
  };
};
// get progress filter
export const getProgressFilter = () => {
  return {
    type: CONFIG_ACTION.GET_PROGRESS_FILTER,
  };
};
export const getProgressFilterSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_PROGRESS_FILTER_SUCCESS,
    payload,
  };
};
export const getProgressFilterFailure = () => {
  return {
    type: CONFIG_ACTION.GET_PROGRESS_FILTER_FAILURE,
  };
};
// get vehicle handing filter
export const getVehicleHandingFilter = () => {
  return {
    type: CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER,
  };
};
export const getVehicleHandingFilterSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER_SUCCESS,
    payload,
  };
};
export const getVehicleHandingFilterFailure = () => {
  return {
    type: CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER_FAILURE,
  };
};
// get request types
export const getRequestTypes = () => {
  return {
    type: CONFIG_ACTION.GET_REQUEST_TYPES,
  };
};
export const getRequestTypesSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_REQUEST_TYPES_SUCCESS,
    payload,
  };
};
export const getRequestTypesFailure = () => {
  return {
    type: CONFIG_ACTION.GET_REQUEST_TYPES_FAILURE,
  };
};
// get check list types
export const getCheckListTypes = () => {
  return {
    type: CONFIG_ACTION.GET_CHECK_LIST_TYPES,
  };
};
export const getCheckListTypesSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_CHECK_LIST_TYPES_SUCCESS,
    payload,
  };
};
export const getCheckListTypesFailure = () => {
  return {
    type: CONFIG_ACTION.GET_CHECK_LIST_TYPES_FAILURE,
  };
};
// get list brand
export const getListBrand = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_BRAND,
  };
};
export const getListBrandSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_LIST_BRAND_SUCCESS,
    payload,
  };
};
export const getListBrandFailure = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_BRAND_FAILURE,
  };
};
// get list model
export const getListModel = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_MODEL,
  };
};
export const getListModelSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_LIST_MODEL_SUCCESS,
    payload,
  };
};
export const getListModelFailure = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_MODEL_FAILURE,
  };
};
// get list country
export const getListCountry = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_COUNTRY,
  };
};
export const getListCountrySuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_LIST_COUNTRY_SUCCESS,
    payload,
  };
};
export const getListCountryFailure = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_COUNTRY_FAILURE,
  };
};
// get list province
export const getListProvince = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_PROVINCE,
  };
};
export const getListProvinceSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_LIST_PROVINCE_SUCCESS,
    payload,
  };
};
export const getListProvinceFailure = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_PROVINCE_FAILURE,
  };
};
// get list district
export const getListDistrict = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_DISTRICT,
  };
};
export const getListDistrictSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_LIST_DISTRICT_SUCCESS,
    payload,
  };
};
export const getListDistrictFailure = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_DISTRICT_FAILURE,
  };
};
// get list district
export const getListWard = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_WARD,
  };
};
export const getListWardSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_LIST_WARD_SUCCESS,
    payload,
  };
};
export const getListWardFailure = () => {
  return {
    type: CONFIG_ACTION.GET_LIST_WARD_FAILURE,
  };
};
export const getCheckList = () => {
  return {
    type: CONFIG_ACTION.GET_CHECK_LIST,
  };
};
export const getCheckListSuccess = (payload) => {
  return {
    type: CONFIG_ACTION.GET_CHECK_LIST_SUCCESS,
    payload,
  };
};
export const getCheckListFailure = () => {
  return {
    type: CONFIG_ACTION.GET_CHECK_LIST_FAILURE,
  };
};
export const setListCompany = (payload) => {
  return {
    type: CONFIG_ACTION.SET_LIST_COMPANY,
    payload,
  };
};
