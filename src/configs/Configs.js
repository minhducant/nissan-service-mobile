export const VN_FORMAT_TIME = 'HH:mm:ss';
export const VN_FORMAT_DATE = 'DD-MM-YYYY';
export const GL_FORMAT_DATE = 'YYYY-MM-DD';
// export const GL_FORMAT_DATE = 'DD-MM-YYYY';
export const VN_FORMAT_DATETIME = 'DD-MM-YYYY HH:mm:ss';
export const GL_FORMAT_DATETIME = 'YYYY-MM-DD HH:mm:ss';
export const CODE_PUSH =
  'appcenter codepush release-react -a app.erpviet.mobile/Android-NissanService -d Production';
export const API_URL = 'http://dmstest-upgrade.nissanvietnam.vn/api/v1/tcg';
export const URL_PUBLIC = 'http://dmstest-upgrade.nissanvietnam.vn';
// export const API_URL = 'https://5s.izisolution.vn/api/v1/vad';
// export const URL_PUBLIC = 'https://5s.izisolution.vn';
// export const URL_SCAN_LICENSE = 'https://lic.pitec.vn/api';
export const URL_SCAN_LICENSE = 'https://ai.nissanvietnam.vn:7001/api';
// export const API_URL = 'https://dms.nissanvietnam.vn/api/v1/tcg';
// export const URL_PUBLIC = 'https://dms.nissanvietnam.vn';
// export const API_URL = 'http://10.32.33.28:6868/api/v1/tcg';
// export const URL_PUBLIC = 'http://10.32.33.28:6868';
export const HeaderTableCheckOrder = [
  {name: 'Thông tin kiểm tra'},
  {name: 'Trạng thái tiếp nhận'},
  {name: 'Trạng thái giao xe'},
];
// Lịch hẹn
export const AppointmentScheduleState = {
  all: '#014768',
  new: 'rgba(255, 153, 51, 1)',
  confirmed: 'rgba(0, 102, 0, 1)',
  received: 'rgba(204, 0, 153, 1)',
  cancel: 'rgba(208, 0, 0, 1)',
};
// Tiếp nhận
export const ReceptionState = {
  all: '#869397',
  received: 'rgba(51, 51, 153, 1)',
  draft: 'rgba(0, 102, 0, 1)',
  assigned: 'rgba(153, 153, 255, 1)',
  assign_accepted: 'rgba(204, 0, 153, 1)',
  quotation_accepted: 'rgba(255, 0, 102, 1)',
  repairing: 'rgba(128, 0, 0, 1)',
  invoicing: 'rgba(107, 182, 177, 1)',
  wait_payment: 'rgba(255, 207, 27, 1)',
  handing: 'rgba(255, 153, 51, 1)',
  handed: 'rgba(0, 255, 0, 1)',
  cancel: 'rgba(208, 0, 0, 1)',
};

export const RepairState = {
  all: '#869397',
  new: 'rgba(255, 207, 27, 1)',
  pause: 'rgba(153, 153, 255, 1)',
  repairing: 'rgba(255, 0, 102, 1)',
  repaired: 'rgba(0, 255, 0, 1)',
  verify: 'rgba(255, 117, 0, 1)',
  cancel: 'rgba(208, 0, 0, 1)',
};

export const HandingState = {
  all: '#014768',
  handed: 'rgba(0, 255, 0, 1)',
};
export const QuotationState = {
  all: 'rgba(1, 71, 104, 1)',
  draft: 'rgba(168, 227, 73, 1)',
  repair_request: 'rgba(107, 182, 177, 1)',
  wait_settlement: 'rgba(160, 214, 254, 1)',
  wait_pay: 'rgba(255, 117, 0, 1)',
  pay_off: 'rgba(233, 65, 202, 1)',
  cancel: 'rgba(215, 40, 40, 1)',
};
export const ListRefreshColor = ['transparent'];
export const ProgressState = {
  all: '#869397',
  new: '#bab128',
  pause: '#ce7277',
  repaired: '#014768',
  repairing: '#E6860E',
  verify: '#007f1d',
  cancel: '#d72828',
};
export default {
  HeaderTableCheckOrder,
  AppointmentScheduleState,
  ReceptionState,
  VN_FORMAT_DATE,
  GL_FORMAT_DATE,
  VN_FORMAT_TIME,
  GL_FORMAT_DATETIME,
  VN_FORMAT_DATETIME,
  ListRefreshColor,
  ProgressState,
  QuotationState,
  HandingState,
  RepairState,
};
export const ADMIN = 'Izi$VAD2021@VN';
