import {combineReducers, createStore, applyMiddleware} from 'redux';
import {all} from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';
// !import all reducer in here!
import appointmentReducer from '@stores/appointment/reducers';
import configReducer from '@stores/config/reducers';
import authReducer from '@stores/auth/reducers';
// !import sagas in here!
import appointmentSaga from './appointment/sagas';
import configSaga from './config/sagas';
import authSaga from './auth/sagas';

const combinedReducer = combineReducers({
  appointment: appointmentReducer,
  conf: configReducer,
  auth: authReducer,
});
const rootSaga = function* () {
  yield all([...appointmentSaga, configSaga, authSaga]);
};
const sagaMiddleware = createSagaMiddleware();
const store = createStore(combinedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default {store};
