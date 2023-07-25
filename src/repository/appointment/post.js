import Axios from '@configs/Axios';

export default {
  createRepairSchedule: ({
    accessToken,
    license_plate,
    x_current_kilometer,
    x_brand_id,
    model_id,
    adviser_id,
    x_contact_phone,
    x_contact_name,
    contact_name,
    phone,
    street,
    booking_date,
    booking_hour,
    customer_require,
    request_type_ids,
    x_appointment_evaluation,
    booking_minute,
  }) => {
    const url = '/appointment/create';
    const params = {
      license_plate: license_plate,
      access_token: accessToken,
      x_contact_name: x_contact_name,
      x_contact_phone: x_contact_phone,
      contact_name: contact_name,
      phone: phone,
      customer_require: customer_require,
      booking_date: booking_date,
      booking_minute: booking_minute,
      booking_hour: booking_hour,
    };
    if (x_current_kilometer) {
      params.x_current_kilometer = x_current_kilometer;
    }
    if (x_brand_id) {
      params.x_brand_id = x_brand_id;
    }
    if (model_id) {
      params.model_id = model_id;
    }
    if (adviser_id) {
      params.adviser_id = adviser_id;
    }
    if (street) {
      params.street = street;
    }
    if (request_type_ids) {
      params.request_type_ids = request_type_ids;
    }
    if (x_appointment_evaluation) {
      params.x_appointment_evaluation = x_appointment_evaluation;
    }
    if (__DEV__) {
      console.log(`create reception params: ${JSON.stringify(params)}`);
    }
    return Axios.post(url, params);
  },
};
