import Axios from '@configs/Axios';

export default {
  crateQuotation: ({
    accessToken,
    reception_id,
    date_hand_plan,
    car_service_ids,
    signature_quotation_client,
    signature_quotation_adviser,
    adviser_id,
    license_plate,
    car_service_lines,
    origin,
  }) => {
    const url = '/quotation/create';
    const params = {
      access_token: accessToken,
      reception_id: reception_id,
      date_hand_plan: date_hand_plan,
      car_service_ids: car_service_ids,
      signature_quotation_adviser: signature_quotation_adviser,
      signature_quotation_client: signature_quotation_client,
      adviser_id: adviser_id,
      license_plate: license_plate,
      car_service_lines: car_service_lines,
      origin: origin,
    };
    console.log(car_service_lines);
    return Axios.post(url, params);
  },
  getServiceInformation: ({accessToken, car_service_ids}) => {
    const url = '/car_service/detail';
    const params = {
      access_token: accessToken,
      car_service_ids: car_service_ids,
    };
    if (__DEV__) {
      console.log(
        `In DEV mode getServiceInformation: ${JSON.stringify(params)}`,
      );
    }
    return Axios.post(url, params);
  },
};
