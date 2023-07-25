import {takeEvery, call, put} from 'redux-saga/effects';

import CONFIG_ACTION from './actionTypes';
import configServices from './services';
import {
  getAppointmentsFilterSuccess,
  getAppointmentsFilterFailure,
  getReceptionsFilterSuccess,
  getReceptionsFilterFailure,
  getQuotationsFilterSuccess,
  getQuotationsFilterFailure,
  getProgressFilterSuccess,
  getProgressFilterFailure,
  getVehicleHandingFilterSuccess,
  getVehicleHandingFilterFailure,
  getRequestTypesSuccess,
  getRequestTypesFailure,
  getCheckListTypesSuccess,
  getCheckListTypesFailure,
  getListBrandSuccess,
  getListBrandFailure,
  getListModelSuccess,
  getListModelFailure,
  getListCountrySuccess,
  getListCountryFailure,
  getListProvinceSuccess,
  getListProvinceFailure,
  getListDistrictSuccess,
  getListDistrictFailure,
  getListWardSuccess,
  getListWardFailure,
  getCheckListSuccess,
  getCheckListFailure,
} from './actions';

function* getAppointmentFilter() {
  try {
    const response = yield call(() => configServices.getAppointmentsFilter());
    const {data, message} = response;
    yield put(getAppointmentsFilterSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getAppointmentsFilterFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getReceptionsFilter() {
  try {
    const response = yield call(() => configServices.getReceptionsFilter());
    const {data, message} = response;
    yield put(getReceptionsFilterSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getReceptionsFilterFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getQuotationsFilter() {
  try {
    const response = yield call(() => configServices.getQuotationsFilter());
    const {data, message} = response;
    yield put(getQuotationsFilterSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getQuotationsFilterFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getProgressFilter() {
  try {
    const response = yield call(() => configServices.getProgressFilter());
    const {data, message} = response;
    yield put(getProgressFilterSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getProgressFilterFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getVehicleHandingFilter() {
  try {
    const response = yield call(() => configServices.getVehicleHandingFilter());
    const {data, message} = response;
    yield put(getVehicleHandingFilterSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getVehicleHandingFilterFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getRequestTypes() {
  try {
    const response = yield call(() => configServices.getRequestTypes());
    const {data, message} = response;
    yield put(getRequestTypesSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getRequestTypesFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getCheckListType() {
  try {
    const response = yield call(() => configServices.getCheckListTypes());
    const {data, message} = response;
    yield put(getCheckListTypesSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getCheckListTypesFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getListBrand() {
  try {
    const response = yield call(() => configServices.getListBrand());
    const {data, message} = response;
    yield put(getListBrandSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getListBrandFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getListModel() {
  try {
    const response = yield call(() => configServices.getListModel());
    const {data, message} = response;
    yield put(getListModelSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getListModelFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getListCountry() {
  try {
    const response = yield call(() => configServices.getListCountry());
    const {data, message} = response;
    yield put(getListCountrySuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getListCountryFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getListProvince() {
  try {
    const response = yield call(() => configServices.getListProvince());
    const {data, message} = response;
    yield put(getListProvinceSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getListProvinceFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getListDistrict() {
  try {
    const response = yield call(() => configServices.getListDistrict());
    const {data, message} = response;
    yield put(getListDistrictSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getListDistrictFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getListWard() {
  try {
    const response = yield call(() => configServices.getListWard());
    const {data, message} = response;
    yield put(getListWardSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getListWardFailure());
    // yield put(showMessage(error_msg));
  }
}
function* getCheckListSagas() {
  try {
    const response = yield call(() => configServices.getCheckList());
    const {data, message} = response;
    yield put(getCheckListSuccess(data));
    // yield put(showMessage(message));
  } catch (error_msg) {
    yield put(getCheckListFailure());
    // yield put(showMessage(error_msg));
  }
}
function* watchAll() {
  yield takeEvery(CONFIG_ACTION.GET_APPOINTMENT_FILTER, getAppointmentFilter);
  yield takeEvery(CONFIG_ACTION.GET_RECEPTION_FILTER, getReceptionsFilter);
  yield takeEvery(CONFIG_ACTION.GET_QUOTATION_FILTER, getQuotationsFilter);
  yield takeEvery(CONFIG_ACTION.GET_PROGRESS_FILTER, getProgressFilter);
  yield takeEvery(CONFIG_ACTION.GET_REQUEST_TYPES, getRequestTypes);
  yield takeEvery(
    CONFIG_ACTION.GET_VEHICLE_HANDING_FILTER,
    getVehicleHandingFilter,
  );
  yield takeEvery(CONFIG_ACTION.GET_CHECK_LIST_TYPES, getCheckListType);
  yield takeEvery(CONFIG_ACTION.GET_LIST_BRAND, getListBrand);
  yield takeEvery(CONFIG_ACTION.GET_LIST_MODEL, getListModel);
  yield takeEvery(CONFIG_ACTION.GET_LIST_COUNTRY, getListCountry);
  yield takeEvery(CONFIG_ACTION.GET_LIST_PROVINCE, getListProvince);
  yield takeEvery(CONFIG_ACTION.GET_LIST_PROVINCE, getListProvince);
  yield takeEvery(CONFIG_ACTION.GET_LIST_DISTRICT, getListDistrict);
  yield takeEvery(CONFIG_ACTION.GET_LIST_WARD, getListWard);
  yield takeEvery(CONFIG_ACTION.GET_CHECK_LIST, getCheckListSagas);
}

export default watchAll();
