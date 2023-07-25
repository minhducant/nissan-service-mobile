import Axios from '@configs/Axios';
import API from '@configs/API';
export default {
  updateSignature: ({receptionId, signatureReceived}) => {
    const url = API.RECEPTION.UPDATE_RECEIVED_SIGNATURE;
    const params = {
      reception_id: receptionId,
      signature_received: signatureReceived,
    };
    // if (__DEV__) {
    //     console.log(`In dev mode: param sign ${JSON.stringify(params)}`);
    // }
    return Axios.put(url, params);
  },
  updateAction: ({receptionId, action}) => {
    const url = API.RECEPTION.ACTIONS;
    const params = {
      reception_id: receptionId,
      action,
    };
    if (__DEV__) {
      // console.log(`In dev mode: param update Action ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
  actionAssignAdvisor: ({receptionId, action, adviserId}) => {
    const url = '/reception/action/assign_adviser';
    const params = {
      reception_id: receptionId,
      action: action,
      adviser_id: adviserId,
    };
    if (__DEV__) {
      // console.log(
      //   `In dev mode: param actionAssignAdvisor ${JSON.stringify(params)}`,
      // );
    }
    return Axios.put(url, params);
  },
};
