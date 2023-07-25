import moment from 'moment';

import {VN_FORMAT_DATE} from '@configs/Configs';
import CONFIG_ACTION from './actionTypes';

const today = moment().format(VN_FORMAT_DATE);
const initialState = {
  isLoading: false,
  appointmentFilter: [],
  receptionFilter: [],
  quotationFilter: [],
  progressFilter: [],
  vehicleHandingFilter: [],
  requestTypes: [],
  checkListTypes: [],
  listBrand: [],
  listModel: [],
  listVNProvince: [],
  listCountry: [],
  listProvince: [],
  listDistrict: [],
  listWard: [],
  checkList: {},
  filter: {
    state: 'all',
    fromDate: today,
    toDate: today,
    name: '',
    lp: '',
  },
  today: moment().format(VN_FORMAT_DATE),
  listCompany: [],
};

const configReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case CONFIG_ACTION.SET_LOADING:
      return {...state, isLoading: payload};
    case CONFIG_ACTION.GET_APPOINTMENT_FILTER:
      return {...state};
    case CONFIG_ACTION.GET_APPOINTMENT_FILTER_SUCCESS:
      return {
        ...state,
        appointmentFilter: payload,
      };
    case CONFIG_ACTION.GET_APPOINTMENT_FILTER_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_RECEPTION_FILTER:
      return {...state};
    case CONFIG_ACTION.GET_RECEPTION_FILTER_SUCCESS:
      return {
        ...state,
        receptionFilter: payload,
      };
    case CONFIG_ACTION.GET_RECEPTION_FILTER_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_QUOTATION_FILTER:
      return {...state};
    case CONFIG_ACTION.GET_QUOTATION_FILTER_SUCCESS:
      return {
        ...state,
        quotationFilter: payload,
      };
    case CONFIG_ACTION.GET_QUOTATION_FILTER_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_PROGRESS_FILTER:
      return {...state};
    case CONFIG_ACTION.GET_PROGRESS_FILTER_SUCCESS:
      return {
        ...state,
        progressFilter: payload,
      };
    case CONFIG_ACTION.GET_PROGRESS_FILTER_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER:
      return {...state};
    case CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER_SUCCESS:
      return {
        ...state,
        vehicleHandingFilter: payload,
      };
    case CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_REQUEST_TYPES:
      return {...state};
    case CONFIG_ACTION.GET_REQUEST_TYPES_SUCCESS:
      return {
        ...state,
        requestTypes: payload,
      };
    case CONFIG_ACTION.GET_REQUEST_TYPES_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_CHECK_LIST_TYPES:
      return {...state};
    case CONFIG_ACTION.GET_CHECK_LIST_TYPES_SUCCESS:
      return {
        ...state,
        checkListTypes: payload,
      };
    case CONFIG_ACTION.GET_CHECK_LIST_TYPES_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_BRAND:
      return {...state};
    case CONFIG_ACTION.GET_LIST_BRAND_SUCCESS:
      return {
        ...state,
        listBrand: payload,
      };
    case CONFIG_ACTION.GET_LIST_BRAND_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_MODEL:
      return {...state};
    case CONFIG_ACTION.GET_LIST_MODEL_SUCCESS:
      return {
        ...state,
        listModel: payload,
      };
    case CONFIG_ACTION.GET_LIST_BRAND_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_PROVINCE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_PROVINCE_SUCCESS:
      const newListProvince = payload.filter(
        (itemProvince) => itemProvince.country.code === 'VN',
      );
      return {
        ...state,
        listProvince: payload,
        listVNProvince: newListProvince,
      };
    case CONFIG_ACTION.GET_LIST_PROVINCE_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_COUNTRY:
      return {...state};
    case CONFIG_ACTION.GET_LIST_COUNTRY_SUCCESS:
      return {
        ...state,
        listCountry: payload,
      };
    case CONFIG_ACTION.GET_LIST_COUNTRY_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_DISTRICT:
      return {...state};
    case CONFIG_ACTION.GET_LIST_DISTRICT_SUCCESS:
      return {
        ...state,
        listDistrict: payload,
      };
    case CONFIG_ACTION.GET_LIST_DISTRICT_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_LIST_WARD:
      return {...state};
    case CONFIG_ACTION.GET_LIST_WARD_SUCCESS:
      return {
        ...state,
        listWard: payload,
      };
    case CONFIG_ACTION.GET_LIST_WARD_FAILURE:
      return {...state};
    case CONFIG_ACTION.GET_CHECK_LIST:
      return {...state};
    case CONFIG_ACTION.GET_CHECK_LIST_SUCCESS:
      return {
        ...state,
        checkList: payload,
      };
    case CONFIG_ACTION.GET_CHECK_LIST_FAILURE:
      return {...state};
    case CONFIG_ACTION.SET_FILTER:
      return {
        ...state,
        filter: payload,
      };
    case CONFIG_ACTION.SET_LIST_COMPANY:
      return {
        ...state,
        listCompany: payload,
      };
    default:
      return state;
  }
};

export default configReducer;
