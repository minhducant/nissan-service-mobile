import moment from 'moment';

import Axios from '@configs/Axios';
import {
  GL_FORMAT_DATE,
  VN_FORMAT_DATE,
  URL_SCAN_LICENSE,
} from '@configs/Configs';
import API from '@configs/API';
import axios from 'axios';
export default {
  createReception: ({
    bookingId,
    customerRequest,
    odoMeter,
    checkList,
    licensePlate,
    dateOrder,
    modelId,
    brandId,
    customerId,
    customerName,
    phone,
    imageCar,
    requestTypeIds,
    repairRequestId,
    vin,
    color,
    warrantyDate,
    provinceId,
    districtId,
    wardsId,
    street,
    contactName,
    contactPhone,
    signatureReceived,
    checkIn,
  }) => {
    const url = API.RECEPTION.CREATE_OR_UPDATE;
    const params = {
      request_type_ids: requestTypeIds,
      odometer: odoMeter,
      checklist: checkList,
      license_plate: licensePlate,
      date_order: dateOrder,
      customer_name: customerName,
      phone,
      model_id: modelId,
      brand_id: brandId,
      vin,
      province_id: provinceId,
      district_id: districtId,
      wards_id: wardsId,
      address: street,
      contact_name: contactName,
      contact_phone: contactPhone,
    };
    if (customerId) {
      params.customer_id = customerId;
    }
    if (bookingId) {
      params.booking_id = bookingId;
    }
    if (customerRequest) {
      params.customer_require = customerRequest;
    }
    if (imageCar) {
      params.image_car = imageCar;
    }
    if (repairRequestId) {
      params.repair_request_id = repairRequestId;
    }
    if (color) {
      params.color = color;
    }
    if (warrantyDate) {
      const newWarrantyDate = moment(warrantyDate, VN_FORMAT_DATE);
      params.warranty_date = newWarrantyDate.format(GL_FORMAT_DATE);
    }
    if (signatureReceived) {
      params.signature_received = signatureReceived;
    }
    if (checkIn) {
      params.check_in = checkIn;
    }
    if (__DEV__) {
      console.log(`create reception params: ${JSON.stringify(params)}`);
    }
    return Axios.post(url, params);
  },
  createImageVehicle: ({imageList, repairRequestId}) => {
    const url = API.RECEPTION.CREATE_ACTUAL_IMG_VEHICLE;
    const params = {
      repair_request_id: repairRequestId,
      image_list: imageList,
    };

    // if (__DEV__) {
    //     console.log(
    //         `create list image vehicle params: ${JSON.stringify(params)}`,
    //     );
    // }
    return Axios.post(url, params);
  },
  createCustomer: ({
    name,
    phone,
    street,
    countryId,
    stateId,
    districtId,
    wardId,
    licensePlate,
    brandId,
    modelId,
    vin,
    color,
    bookingId,
    odometer,
    engineNo,
  }) => {
    const url = API.CUSTOMER.CREATE;
    const params = {
      name,
      phone,
      license_plate: licensePlate,
      brand_id: brandId,
      model_id: modelId,
      vin,
      odometer,
      engine_no: engineNo,
    };
    if (bookingId) {
      params.booking_id = bookingId;
    }
    if (street) {
      params.street = street;
    }
    if (countryId) {
      params.country_id = countryId;
    }
    if (stateId) {
      params.state_id = stateId;
    }
    if (districtId) {
      params.district_id = districtId;
    }
    if (wardId) {
      params.ward_id = wardId;
    }
    if (color) {
      params.color = color;
    }
    if (__DEV__) {
      console.log(`param create customer ${JSON.stringify(params)}`);
    }
    return Axios.post(url, params);
  },
  getLicensePlates: ({image}) =>
    new Promise((handleSuccess, handleError) => {
      const headers = {
        'Content-Type': 'application/json',
        'Pix-Apim-Subscription-Key':
          'ca5cb0bdae6b955205d962eba9ab6df741c40fa92c1404433268527997c9d66d7d5e97032223a55339a2e20beb1cb773',
      };
      // console.log(JSON.stringify(image, null, 2));
      axios
        .post(URL_SCAN_LICENSE, {image}, {headers})
        .then((res) => {
          handleSuccess(res);
        })
        .catch((err) => {
          handleError(err);
        });
    }),
};
