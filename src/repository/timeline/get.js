import Axios from '@configs/Axios';

export default {
  getCustomerTimeline: ({
    accessToken,
    dateFrom,
    dateTo,
    state,
    licensePlate,
    customerName,
    page = 1,
    itemsPerPage = 15,
    x_state_repair_request

  }) => {
    const url = '/action/timeline';
    const params = {
      access_token: accessToken,
      date_from: dateFrom.split('-').reverse().join('-'),
      date_to: dateTo.split('-').reverse().join('-'),
      state: state,
      x_state_repair_request
    };
    console.log(url);
    console.log(params);

    if (licensePlate) {
      params.license_plate = licensePlate;
    }
    if (customerName) {
      params.customer_name = customerName;
    }
    if (page) {
      params.page = page;
    }
    if (itemsPerPage) {
      params.items_per_page = itemsPerPage;
    }

    // if (__DEV__) {
    //   console.log(
    //     `In DEV mode params getCustomerTimeline: ${JSON.stringify(
    //       params,
    //       null,
    //       2,
    //     )}`,
    //   );
    // }
    return Axios.get(url, params);
  },
  getWorkshopTimeline: ({
    accessToken,
    dateFrom,
    dateTo,
    state,
    licensePlate,
    customerName,
    page = 1,
    itemsPerPage = 15,
    repairType = [27, 28, 29, 31, 32, 34],
    adviserId,
    compartmentId,
    type_repair,
    x_state_repair_request,
    compartment_not_choose
  }) => {
    const url =
      type_repair === 'general_timeline'
        ? '/timeline/compartment_timeline'
        : '/timeline/mixed';
    // const compartment_not_choose = type_repair === "general_timeline" ? compartment_not_chooses : null;
    const params = {
      access_token: accessToken,
      date_from: dateFrom.split('-').reverse().join('-'),
      date_to: dateTo.split('-').reverse().join('-'),
      don_son: repairType,
      x_state_repair_request,
      compartment_not_choose: type_repair === 'general_timeline' && compartment_not_choose,
      state:
        // type_repair === 'general_timeline' ? state === 1 ? 1 : 5 : state,
        type_repair === 'general_timeline' ? (state === 1 ? 1 : 5)
          : type_repair === "paint_timeline" ? (state === "repaired" ? "repaired" : "all") : state,

    };
    console.log(params);
    console.log(url);

    if (licensePlate) {
      params.license_plate = licensePlate;
    }
    if (customerName) {
      params.customer_name = customerName;
    }
    if (adviserId) {
      params.adviser_id = JSON.stringify([adviserId]);
    }
    if (compartmentId) {
      params.compartment_id = JSON.stringify([compartmentId]);
    }
    if (page) {
      params.page = page;
    }
    if (itemsPerPage) {
      params.items_per_page = itemsPerPage;
    }
    if (repairType.length > 5) {
      params.summary = JSON.stringify([27, 28, 29, 31, 32, 34]);
    }
    if (
      repairType.length === 4 &&
      repairType.every(function (item) {
        return item !== 28;
      })
    ) {
      params.repair_type_id = JSON.stringify([27, 31, 32, 34]);
    }
    if (
      repairType.length === 1 &&
      repairType.every(function (item) {
        return item !== 28 && item !== 29;
      })
    ) {
      params.repair_type_id = JSON.stringify(repairType);
    }
    if (
      repairType.length === 2 &&
      repairType.every(function (item) {
        return item !== 27;
      })
    ) {
      params.don_son = JSON.stringify([28, 29]);
    }
    if (
      repairType.length === 1
      // repairType.every(function (item) {
      //   return item !== 27 && item !== 31 && item !== 32 && item !== 34;
      // })
    ) {
      params.don_son = JSON.stringify(repairType);
    }
    if (x_state_repair_request) {
      params.x_state_repair_request = x_state_repair_request;
    }
    if (compartment_not_choose) {
      params.compartment_not_choose = compartment_not_choose;
    }
    if (__DEV__) {
      // console.log(
      //   `In DEV mode params getWorkshopTimeline: ${JSON.stringify(
      //     params,
      //     null,
      //     2,
      //   )}`,
      // );
    }
    return Axios.get(url, params);
  },
  getTechnical: ({ accessToken: accessToken, company_id: company_id }) => {
    const url = '/fleet/technical';
    const params = {
      access_token: accessToken,
      company_id: company_id,
    };
    return Axios.get(url, params);
  },
  getAdviser: ({ accessToken, company_id }) => {
    const url = '/adviser/list';
    const params = {
      access_token: accessToken,
      company_id: company_id,
    };
    return Axios.get(url, params);
  },
  getCompartment: ({ accessToken, company_id }) => {
    const url = '/fleet/compartment';
    const params = {
      access_token: accessToken,
      company_id: company_id,
    };
    return Axios.get(url, params);
  },
};
