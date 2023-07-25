import Axios from '@configs/Axios';
import API from '@configs/API';
export default {
  updateCheckList: ({receptionId, checkList}) => {
    const url = API.VEHICLE_HANDING.UPDATE_CHECKLIST;
    const params = {
      reception_id: receptionId,
      checklist: checkList,
    };
    if (__DEV__) {
      // console.log(`In dev mode: param update list: ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
  updateSignature: ({receptionId, signatureHanded}) => {
    const url = API.VEHICLE_HANDING.UPDATE_HANDED_SIGNATURE;
    const params = {
      reception_id: receptionId,
      signature_handed: signatureHanded,
    };
    if (__DEV__) {
      // console.log(`In dev mode: param sign ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
};
