export const menu = [
  {
    name: 'Home',
    key: 'home',
    isSelected: true,
    screen: 'Home',
  },
  {
    name: 'Lịch hẹn',
    key: 'appointment',
    isSelected: false,
    screen: 'AppointmentScreen',
  },
  {
    name: 'Tiếp nhận',
    key: 'reception',
    isSelected: false,
    screen: 'ReceptionScreen',
  },
  {
    name: 'Báo giá',
    key: 'quotation',
    isSelected: false,
    screen: 'QuotationScreen',
  },
  {
    name: 'Lệnh sửa chữa',
    key: 'repair',
    isSelected: false,
    screen: 'RepairOrderScreen',
  },
  {
    name: 'Tiến độ',
    key: 'progress',
    isSelected: false,
    screen: 'ProgressScreen',
  },
  {
    name: 'Timeline KH',
    key: 'customer_timeline',
    isSelected: false,
    screen: 'CustomerTimeline',
  },

  {
    name: 'Timeline SCC',
    key: 'general_timeline',
    isSelected: false,
    screen: 'GeneralTimeline',
  },
  {
    name: 'Timeline Don Son',
    key: 'paint_timeline',
    isSelected: false,
    screen: 'PaintTimeline',
  },
  {
    name: 'Timeline hỗn hợp',
    key: 'mixture_timeline',
    isSelected: false,
    screen: 'MixtureTimeline',
  },
  {
    name: 'Giao xe',
    key: 'vehicle_handing',
    isSelected: false,
    screen: 'VehicleHandingScreen',
  },
  {
    name: 'Bản tin kỹ thuật',
    key: 'news',
    isSelected: false,
    screen: 'NewsScreen',
  },
  {
    name: 'Video HDSD',
    key: 'video',
    isSelected: false,
    screen: 'VideoScreen',
  },
  {
    name: 'Tài liệu',
    key: 'document',
    isSelected: false,
    screen: 'DocumentScreen',
  },
  {
    name: 'Báo cáo',
    key: 'report',
    isSelected: false,
    screen: 'ReportScreen',
  },
  {
    name: 'Tư vấn',
    key: 'advisory',
    isSelected: false,
    screen: 'AdvisoryScreen',
  },
  {
    name: 'Đăng xuất',
    key: 'sign_out',
    isSelected: false,
    screen: 'VehicleHandingScreen',
  },
];
export const reportMenu = [
  {
    name: 'Biểu đồ lượt dịch vụ',
    key: 'ServicesChart',
    isSelect: true,
    list: [
      {
        name: 'Lượt xe dịch vụ',
        key: 'revenue',
        isSelect: true,
      },
      {
        name: 'Lượt xe trung bình',
        key: 'revenue',
        isSelect: false,
      },
      // {
      //   name: 'Cơ cấu lượt xe dịch vụ',
      //   key: 'revenue',
      //   isSelect: false,
      // },
      {
        name: 'Phân bổ lượt xe theo CVDV',
        key: 'revenue',
        isSelect: false,
      },
    ],
  },
  {
    name: 'Biểu đồ doanh thu dịch vụ',
    key: 'RevenueChart',
    isSelect: false,
    list: [
      {
        name: 'Doanh thu dịch vụ',
        key: 'revenue',
        isSelect: true,
      },
      {
        name: 'Doanh thu trung bình',
        key: 'revenue',
        isSelect: false,
      },
      {
        name: 'Doanh thu theo loại công việc',
        key: 'fleet_task',
        isSelect: false,
      },
      {
        name: 'Doanh thu theo đối tượng thanh toán',
        key: 'object_payment',
        isSelect: false,
      },
    ],
  },
  {
    name: 'Biểu đồ lịch hẹn',
    key: 'AppointmentChart',
    isSelect: false,
    list: [
      {
        name: 'Lịch hẹn theo ngày/ tháng',
        key: 'appointment',
        isSelect: true,
      },
    ],
  },
  // {
  //   name: 'Biểu đồ chăm sóc khách hàng',
  //   key: 'CustomerCareChart',
  //   isSelect: false,
  //   list: [
  //     {
  //       name: 'Khiếu nại dịch vụ',
  //       key: 'customer_care',
  //       isSelect: true,
  //     },
  //   ],
  // },
];
