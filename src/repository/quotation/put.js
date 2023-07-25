import Axios from '@configs/Axios';

export default {
  createAction: ({quotationId, action, accessToken}) => {
    const url = '/quotation/action/create';
    const params = {
      access_token: accessToken,
      quotation_id: quotationId,
      action: action,
    };
    if (__DEV__) {
      console.log(`In dev mode: param update Action ${JSON.stringify(params)}`);
    }
    return Axios.put(url, params);
  },
  updateQuotation: ({
    access_token,
    quotation_id,
    sale_order_lines,
    request_type_ids,
  }) => {
    const url = '/quotation/update';
    const params = {
      access_token: access_token,
      quotation_id: quotation_id,
      sale_order_lines: sale_order_lines,
      request_type_ids: request_type_ids,
    };
    if (__DEV__) {
      // console.log(JSON.stringify(params, null, 2));
    }
    return Axios.put(url, params);
  },
  updateSignature: ({
    access_token,
    quotationId,
    signature_quotation_client,
    signature_quotation_adviser,
  }) => {
    const url = '/update/signature';
    const params = {
      access_token: access_token,
      quotation_id: quotationId,
    };
    if (signature_quotation_client) {
      params.signature_quotation_client = signature_quotation_client;
    }
    if (signature_quotation_adviser) {
      params.signature_quotation_adviser = signature_quotation_adviser;
    }
    return Axios.put(url, params);
  },
};
