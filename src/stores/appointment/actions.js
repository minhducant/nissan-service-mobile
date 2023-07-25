import APPOINTMENT_ACTIONS from './actionTypes';

export const setCheckType = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_CHECK_TYPE,
    payload,
  };
};
export const setCustomerRequest = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_CUSTOMER_REQUEST,
    payload,
  };
};
export const setInitCheckedReceive = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_INIT_CHECKED_RECEIVE,
    payload,
  };
};
export const setReceive = (section, id, value) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_RECEIVE,
    section,
    id,
    value,
  };
};
export const setInitCheckedHanding = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_INIT_CHECKED_HANDING,
    payload,
  };
};
export const setHanding = (section, id, value) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_HANDING,
    section,
    id,
    value,
  };
};
export const setShowVehicleBodyModal = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_SHOW_VEHICLE_BODY_MODAL,
    payload,
  };
};
export const setVehicle = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_VEHICLE,
    payload,
  };
};
export const setCustomer = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_CUSTOMER,
    payload,
  };
};
export const setEmptyData = () => {
  return {
    type: APPOINTMENT_ACTIONS.SET_EMPTY_DATA,
  };
};
export const setState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_STATE,
    payload,
  };
};
export const setDateOrder = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_DATE_ORDER,
    payload,
  };
};
export const setWarrantyDate = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_WARRANTY_DATE,
    payload,
  };
};
export const setCheckList = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_CHECK_LIST,
    payload,
  };
};
export const setListImage = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_LIST_IMAGE,
    payload,
  };
};
export const setListUrlImage = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_LIST_URL_IMAGE,
    payload,
  };
};
export const setRepState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_RECEPTION_STATE,
    payload,
  };
};
export const setHandingState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_HANDING_STATE,
    payload,
  };
};
export const setAppointmentState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_APPOINTMENT_STATE,
    payload,
  };
};
export const setCustomerSignature = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_CUSTOMER_SIGNATURE,
    payload,
  };
};
export const setAdvisorSignature = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_ADVISOR_SIGNATURE,
    payload,
  };
};
export const setServiceLabor = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_SERVICE_LABOR,
    payload,
  };
};
export const setServiceMaterial = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_SERVICE_MATERIAL,
    payload,
  };
};
export const setTotalServiceUndiscount = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_TOTAL_SERVICE_UNDISCOUNT,
    payload,
  };
};
export const setTotalService = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_TOTAL_SERVICE,
    payload,
  };
};
export const setTotalMaterialUndiscount = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_TOTAL_MATERIAL_UNDISCOUNT,
    payload,
  };
};
export const setTotalMaterial = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_TOTAL_MATERIAL,
    payload,
  };
};
export const setTotalAmountUndiscount = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_TOTAL_AMOUNT_UNDISCOUNT,
    payload,
  };
};
export const setTotalAmount = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_TOTAL_AMOUNT,
    payload,
  };
};
export const setAmountDiscount = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_AMOUNT_DISCOUNT,
    payload,
  };
};
export const setAmountPromotion = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_AMOUNT_PROMOTION,
    payload,
  };
};
export const setAmountTax = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_AMOUNT_TAX,
    payload,
  };
};
export const setAmountCustomerTotal = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_AMOUNT_CUSTOMER_TOTAL,
    payload,
  };
};
export const setAmountInsurance = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_AMOUNT_INSURANCE,
    payload,
  };
};
export const setAmountInternal = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_AMOUNT_INTERNAL,
    payload,
  };
};
export const setWorkshopTimelineState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_WORKSHOPTIMELINE_STATE,
    payload,
  };
};
export const setCustomerTimelineState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_CUSTOMERTIMELINE_STATE,
    payload,
  };
};
export const setRepairOrderState = (payload) => {
  return {
    type: APPOINTMENT_ACTIONS.SET_REPAIRORDER_STATE,
    payload,
  };
};
