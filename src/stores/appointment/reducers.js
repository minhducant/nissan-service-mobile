import moment from 'moment';

import APPOINTMENT_ACTIONS from './actionTypes';
import {VN_FORMAT_DATE, GL_FORMAT_DATETIME} from '@configs/Configs';
const initialState = {
  isLoading: false,
  appointments: [],
  meta: {},
  stateTotal: [],
  dateOrder: moment(moment().toDate().getTime()).format(GL_FORMAT_DATETIME),
  warrantyDate: moment().format(VN_FORMAT_DATE),
  checkType: [],
  customerRequest: '',
  checkList: {},
  totalReceiveOk: 0,
  totalReceiveNg: 0,
  totalHandingOk: 0,
  totalHandingNg: 0,
  listCheckedReceive: {},
  listCheckedHanding: {},
  showVehicleModal: false,
  customer: {
    id: null,
    name: '',
    phone: '',
    districtId: null,
    districtName: '',
    provinceId: null,
    provinceName: '',
    street: '',
    imageSignature: '',
    contactName: '',
    contactPhone: '',
    wardName: '',
    wardId: null,
    urlImageSignatureReceive: '',
    urlImageSignatureHanding: '',
    countryName: '',
    countryId: null,
    customerSignature: '',
    advisorSignature: '',
  },
  vehicle: {
    licensePlate: '',
    vin: '',
    modelId: null,
    modelName: '',
    color: '',
    odoMeter: '',
    brandId: null,
    brandName: '',
    imageCar: '',
    urlImageCar: '',
    engineNo: '',
    lastOdoMeter: 0,
    imageModel: '',
  },
  state: {
    key: '',
    name: '',
  },
  listImageVehicle: [],
  listUrlImageVehicle: [],
  appointmentState: {
    fromDate: moment().format(VN_FORMAT_DATE),
    toDate: moment().format(VN_FORMAT_DATE),
    licensePlate: '',
    state: '',
    customerName: '',
  },
  repState: {
    fromDate: moment().format(VN_FORMAT_DATE),
    toDate: moment().format(VN_FORMAT_DATE),
    licensePlate: '',
    state: '',
    customerName: '',
  },
  handingState: {
    fromDate: moment().format(VN_FORMAT_DATE),
    toDate: moment().format(VN_FORMAT_DATE),
    licensePlate: '',
    state: '',
    customerName: '',
  },
  customerSignature: '',
  advisorSignature: '',
  serviceLabor: [],
  serviceMaterial: [],
  totalServiceUndiscount: 0,
  totalService: 0,
  totalMaterialUndiscount: 0,
  totalMaterial: 0,
  totalAmountUndiscount: 0,
  totalAmount: 0,
  amountDiscount: 0,
  amountPromotion: 0,
  amountTax: 0,
  amountCustomerTotal: 0,
  amountInsurance: 0,
  amountInternal: 0,
  wkTimelineState: {
    fromDate: moment().format(VN_FORMAT_DATE),
    toDate: moment().format(VN_FORMAT_DATE),
    licensePlate: '',
    state: '',
    customerName: '',
    repairType: [27, 28, 29, 31, 32, 34],
  },
  cusTimelineState: {
    fromDate: moment().format(VN_FORMAT_DATE),
    toDate: moment().format(VN_FORMAT_DATE),
    licensePlate: '',
    state: '',
    customerName: '',
  },
  repairOrderState: {
    fromDate: moment().format(VN_FORMAT_DATE),
    toDate: moment().format(VN_FORMAT_DATE),
    licensePlate: '',
    state: '',
    customerName: '',
  },
};

const appointmentReducer = (st = initialState, action) => {
  const {type, payload} = action;
  const receiveFormatted = {};
  const handingFormatted = {};
  const getTotal = (dict) => {
    const dataHasValues = Object.values(dict).filter(
      (e) => Object.keys(e).length > 0,
    );
    let totalNg = 0;
    let totalOk = 0;
    dataHasValues.forEach((i) => {
      Object.entries(i).map(([id, value]) => {
        if (value.hasOwnProperty('ng')) {
          totalNg += 1;
        }
        if (value.hasOwnProperty('ok')) {
          totalOk += 1;
        }
      });
    });
    return [totalOk, totalNg];
  };
  const checkHanding = (list = []) => {
    const item =
      list.find(
        (it) =>
          it.vehicle_handing.ok === true || it.vehicle_handing.ng === true,
      ) || {};
    if (Object.keys(item).length > 0) {
      return true;
    } else {
      return false;
    }
  };
  switch (type) {
    case APPOINTMENT_ACTIONS.SET_CHECK_TYPE:
      return {...st, checkType: payload};
    case APPOINTMENT_ACTIONS.SET_CUSTOMER_REQUEST:
      return {...st, customerRequest: payload};
    case APPOINTMENT_ACTIONS.SET_CHECK_LIST:
      const formatChecklist = {...payload};
      Object.keys(action.payload).forEach((item) => {
        if (!checkHanding(formatChecklist[item])) {
          formatChecklist[item].forEach((it, index) => {
            // console.log(
            //   `no checklist handing${JSON.stringify(
            //     formatChecklist[item][index].vehicle_handing,
            //   )} receive ${JSON.stringify(
            //     formatChecklist[item][index].receive,
            //   )}`,
            // );
            formatChecklist[item][index].vehicle_handing =
              formatChecklist[item][index].receive;
          });
        }
      });
      // console.log('checklist format', JSON.stringify(formatChecklist));
      return {
        ...st,
        checkList: formatChecklist,
      };
    case APPOINTMENT_ACTIONS.SET_INIT_CHECKED_RECEIVE:
      Object.keys(payload).forEach((item) => {
        receiveFormatted[item] = {};
        if (payload[item].length > 0) {
          payload[item].forEach((it) => {
            if (it.receive.ok) {
              if (it.hasOwnProperty('note_before')) {
                receiveFormatted[item][it.id] = {
                  ok: it.note_before,
                };
              } else {
                receiveFormatted[item][it.id] = {ok: ''};
              }
            } else if (it.receive.ng) {
              if (it.hasOwnProperty('note_before')) {
                receiveFormatted[item][it.id] = {
                  ng: it.note_before,
                };
              } else {
                receiveFormatted[item][it.id] = {ng: ''};
              }
            } else {
              receiveFormatted[item][it.id] = {};
            }
          });
        }
      });
      return {
        ...st,
        listCheckedReceive: receiveFormatted,
        totalReceiveOk: getTotal(receiveFormatted)[0],
        totalReceiveNg: getTotal(receiveFormatted)[1],
      };
    case APPOINTMENT_ACTIONS.SET_RECEIVE:
      const cpReceive = {...st.listCheckedReceive};
      cpReceive[action.section][action.id] = action.value;
      return {
        ...st,
        listCheckedReceive: cpReceive,
        totalReceiveOk: getTotal(cpReceive)[0],
        totalReceiveNg: getTotal(cpReceive)[1],
      };
    case APPOINTMENT_ACTIONS.SET_INIT_CHECKED_HANDING:
      Object.keys(payload).forEach((item) => {
        handingFormatted[item] = {};
        if (payload[item].length > 0) {
          payload[item].forEach((it) => {
            if (it.vehicle_handing.ok) {
              if (it.hasOwnProperty('note_after')) {
                handingFormatted[item][it.id] = {
                  ok: it.note_after,
                };
              } else {
                handingFormatted[item][it.id] = {ok: ''};
              }
            } else if (it.vehicle_handing.ng) {
              if (it.hasOwnProperty('note_after')) {
                handingFormatted[item][it.id] = {
                  ng: it.note_after,
                };
              } else {
                handingFormatted[item][it.id] = {ng: ''};
              }
            } else {
              handingFormatted[item][it.id] = {ok: ''};
            }
          });
        }
      });
      return {
        ...st,
        listCheckedHanding: handingFormatted,
        totalHandingOk: getTotal(handingFormatted)[0],
        totalHandingNg: getTotal(handingFormatted)[1],
      };
    case APPOINTMENT_ACTIONS.SET_HANDING:
      const cpHanding = {...st.listCheckedHanding};
      cpHanding[action.section][action.id] = action.value;
      return {
        ...st,
        listCheckedHanding: cpHanding,
        totalHandingOk: getTotal(cpHanding)[0],
        totalHandingNg: getTotal(cpHanding)[1],
      };
    case APPOINTMENT_ACTIONS.SET_SHOW_VEHICLE_BODY_MODAL:
      return {
        ...st,
        showVehicleModal: payload,
      };
    case APPOINTMENT_ACTIONS.SET_VEHICLE:
      return {
        ...st,
        vehicle: payload,
      };
    case APPOINTMENT_ACTIONS.SET_CUSTOMER:
      return {
        ...st,
        customer: payload,
      };
    case APPOINTMENT_ACTIONS.SET_EMPTY_DATA:
      return {
        ...st,
        customer: {
          id: null,
          name: '',
          phone: '',
          districtId: null,
          districtName: '',
          provinceId: null,
          provinceName: '',
          street: '',
          request: '',
          imageSignature: '',
          contactName: '',
          contactPhone: '',
          wardName: '',
          wardId: null,
          urlImageSignatureReceive: '',
          urlImageSignatureHanded: '',
          foreigner: false,
          countryName: '',
          countryId: null,
        },
        vehicle: {
          licensePlate: '',
          vin: '',
          modelId: null,
          modelName: '',
          color: '',
          odoMeter: '',
          brandId: null,
          brandName: '',
          imageCar: '',
          urlImageCar: '',
          engineNo: '',
          lastOdoMeter: 0,
          imageModel: '',
        },
        listImageVehicle: [],
        listUrlImageVehicle: [],
        dateOrder: moment(moment().toDate().getTime()).format(
          GL_FORMAT_DATETIME,
        ),
        warrantyDate: moment().format(VN_FORMAT_DATE),
        checkType: [],
        customerRequest: '',
        customerSignature: '',
        advisorSignature: '',
        serviceLabor: [],
        serviceMaterial: [],
        totalServiceUndiscount: 0,
        totalService: 0,
        totalMaterialUndiscount: 0,
        totalMaterial: 0,
        totalAmountUndiscount: 0,
        totalAmount: 0,
        amountDiscount: 0,
        amountPromotion: 0,
        amountTax: 0,
        amountCustomerTotal: 0,
        amountInsurance: 0,
        amountInternal: 0,
      };
    case APPOINTMENT_ACTIONS.SET_STATE:
      return {
        ...st,
        state: payload,
      };
    case APPOINTMENT_ACTIONS.SET_DATE_ORDER:
      return {
        ...st,
        dateOrder: payload,
      };
    case APPOINTMENT_ACTIONS.SET_WARRANTY_DATE:
      return {
        ...st,
        warrantyDate: payload,
      };
    case APPOINTMENT_ACTIONS.SET_LIST_IMAGE:
      return {
        ...st,
        listImageVehicle: payload,
      };
    case APPOINTMENT_ACTIONS.SET_LIST_URL_IMAGE:
      return {
        ...st,
        listUrlImageVehicle: payload,
      };
    case APPOINTMENT_ACTIONS.SET_APPOINTMENT_STATE:
      return {
        ...st,
        appointmentState: payload,
      };
    case APPOINTMENT_ACTIONS.SET_RECEPTION_STATE:
      return {
        ...st,
        repState: {
          fromDate: payload.fromDate,
          toDate: payload.toDate,
          licensePlate: payload.licensePlate,
          state: payload.state,
          customerName: payload.customerName,
        },
      };
    case APPOINTMENT_ACTIONS.SET_HANDING_STATE:
      return {
        ...st,
        handingState: payload,
      };
    case APPOINTMENT_ACTIONS.SET_CUSTOMER_SIGNATURE:
      return {
        ...st,
        customerSignature: payload,
      };
    case APPOINTMENT_ACTIONS.SET_ADVISOR_SIGNATURE:
      return {
        ...st,
        advisorSignature: payload,
      };
    case APPOINTMENT_ACTIONS.SET_SERVICE_LABOR:
      return {
        ...st,
        serviceLabor: payload,
      };
    case APPOINTMENT_ACTIONS.SET_SERVICE_MATERIAL:
      return {
        ...st,
        serviceMaterial: payload,
      };
    case APPOINTMENT_ACTIONS.SET_TOTAL_SERVICE_UNDISCOUNT:
      return {
        ...st,
        totalServiceUndiscount: payload,
      };
    case APPOINTMENT_ACTIONS.SET_TOTAL_SERVICE:
      return {
        ...st,
        totalService: payload,
      };
    case APPOINTMENT_ACTIONS.SET_TOTAL_MATERIAL_UNDISCOUNT:
      return {
        ...st,
        totalMaterialUndiscount: payload,
      };
    case APPOINTMENT_ACTIONS.SET_TOTAL_MATERIAL:
      return {
        ...st,
        totalMaterial: payload,
      };
    case APPOINTMENT_ACTIONS.SET_TOTAL_AMOUNT_UNDISCOUNT:
      return {
        ...st,
        totalAmountUndiscount: payload,
      };
    case APPOINTMENT_ACTIONS.SET_TOTAL_AMOUNT:
      return {
        ...st,
        totalAmount: payload,
      };
    case APPOINTMENT_ACTIONS.SET_AMOUNT_DISCOUNT:
      return {
        ...st,
        amountDiscount: payload,
      };
    case APPOINTMENT_ACTIONS.SET_AMOUNT_PROMOTION:
      return {
        ...st,
        amountPromotion: payload,
      };
    case APPOINTMENT_ACTIONS.SET_AMOUNT_TAX:
      return {
        ...st,
        amountTax: payload,
      };
    case APPOINTMENT_ACTIONS.SET_AMOUNT_CUSTOMER_TOTAL:
      return {
        ...st,
        amountCustomerTotal: payload,
      };
    case APPOINTMENT_ACTIONS.SET_AMOUNT_INSURANCE:
      return {
        ...st,
        amountInsurance: payload,
      };
    case APPOINTMENT_ACTIONS.SET_AMOUNT_INTERNAL:
      return {
        ...st,
        amountInternal: payload,
      };
    case APPOINTMENT_ACTIONS.SET_WORKSHOPTIMELINE_STATE:
      return {
        ...st,
        wkTimelineState: payload,
      };
    case APPOINTMENT_ACTIONS.SET_CUSTOMERTIMELINE_STATE:
      return {
        ...st,
        cusTimelineState: payload,
      };
    case APPOINTMENT_ACTIONS.SET_REPAIRORDER_STATE:
      return {
        ...st,
        repairOrderState: payload,
      };
    default:
      return st;
  }
};

export default appointmentReducer;
