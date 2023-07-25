import Axios from '@configs/Axios';

export default {
  repairAction: ({fleet_repair_order_id, action, accessToken}) => {
    const url = '/fleet/action';
    const params = {
      access_token: accessToken,
      fleet_repair_order_id: fleet_repair_order_id,
      action: action,
    };
    if (__DEV__) {
      // console.log(`In dev mode: param update Action ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
  acceptanceWorkAction: ({fleet_repair_order_id, x_note_fro, accessToken}) => {
    const url = '/action/acceptance_work';
    const params = {
      access_token: accessToken,
      fleet_repair_order_id: fleet_repair_order_id,
      active_model: 'fleet.repair.order',
    };
    if (x_note_fro) {
      params.x_note_fro = x_note_fro;
    }
    if (__DEV__) {
      // console.log(
      //   `In dev mode: param acceptanceWorkAction ${JSON.stringify(params)}`,
      // );
    }
    return Axios.put(url, params);
  },
  assignWork: ({
    fleet_repair_order_id,
    active_model,
    accessToken,
    employee_ids,
    active_id,
    company_id,
  }) => {
    const url = '/action/process';
    const params = {
      access_token: accessToken,
      fleet_repair_order_id: fleet_repair_order_id,
      active_model: active_model,
      employee_ids: employee_ids,
      active_id: active_id,
      company_id: company_id,
    };
    if (__DEV__) {
      // console.log(`In dev mode: param update Action ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
  acceptanceWork: ({fleet_repair_order_id, accessToken}) => {
    const url = '/action/acceptance_work';
    const params = {
      access_token: accessToken,
      fleet_repair_order_id: fleet_repair_order_id,
    };
    if (__DEV__) {
      // console.log(`In dev mode: param update Action ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
};
