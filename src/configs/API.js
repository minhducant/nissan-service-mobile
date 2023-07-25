export default {
  AUTH: {
    LOGIN: '/sign_in',
    LOGOUT: '/sign_out',
  },
  APPOINTMENT: {
    LIST: '/appointment/list',
  },
  RECEPTION: {
    LIST: '/reception/list',
    CREATE_OR_UPDATE: '/reception/update',
    DETAIL: '/reception/detail',
    CREATE_ACTUAL_IMG_VEHICLE: '/reception/actual_image/create',
    ACTIONS: '/reception/action',
    UPDATE_RECEIVED_SIGNATURE: '/reception/update/received_signature',
  },
  CUSTOMER: {
    GET: '/customer/customer_by_license_plate',
    CREATE: '/customer_and_vehicle/create',
  },
  EMPLOYEE: {
    LIST: '/employee/list',
  },
  QUOTATION: {
    LIST: '/quotation/list',
    REPORT: '/quotation/report',
  },
  VEHICLE_HANDING: {
    LIST: '/vehicle_handing/list',
    UPDATE_CHECKLIST: '/vehicle_handing/update/checklist',
    UPDATE_HANDED_SIGNATURE: '/vehicle_handing/update/handed_signature',
  },
  PROGRESS: {
    LIST: '/progress/list',
  },
  CONFIGURE: {
    CHECK_LIST: '/configure/check_list',
    REQUEST_TYPES: '/configure/request_types',
    COUNTRY: '/configure/country',
    COUNTRY_DISTRICT: '/configure/country_district',
    COUNTRY_STATE: '/configure/country_state',
    COUNTRY_WARD: '/configure/country_ward',
    VEHICLE_MODEL: '/configure/vehicle_model',
    VEHICLE_MODEL_BRAND: '/configure/vehicle_model_brand',
    COMPANY: '/company/list',
  },
  SYNTHETIC: {
    STATE_AND_QTY: '/synthetic/state_and_quantity',
  },
  FILTER: {
    LIST: '/filters',
    QUOTATION_REPORT_TYPE: '/filters?key=QUOTATION_REPORT_TYPE',
    LANG: '/filters?key=LANG',
    GENDER: '/filters?key=GENDER',
    APPOINTMENT_FILTER: '/filters?key=APPOINTMENT_FILTER',
    APPOINTMENT_FILTER_ALL: '/filters?key=APPOINTMENT_FILTER_ALL',
    RECEPTION_FILTER: '/filters?key=RECEPTION_FILTER',
    QUOTATION_FILTER: '/filters?key=QUOTATION_FILTER',
    PROGRESS_FILTER: '/filters?key=PROGRESS_FILTER',
    HANDING_VEHICLE_FILTER: '/filters?key=HANDING_VEHICLE_FILTER',
    CHECK_LIST_TYPE: '/filters?key=CHECK_LIST_TYPE',
  },
};
