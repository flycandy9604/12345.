// 模擬電商後台數據 (Traditional Chinese)

export const mockOrders = [
  {
    id: "ORD-2026-0501",
    customer: {
      name: "陳小明",
      email: "ming.chen@example.com",
      phone: "0912-345-678",
      address: "台北市信義區信義路五段7號"
    },
    date: "2026-05-22 10:15",
    total: 3680,
    paymentStatus: "已付款",
    shipmentStatus: "出貨中",
    shippingMethod: "黑貓宅急便",
    trackingNumber: "TC-88237194",
    paymentMethod: "信用卡",
    items: [
      { name: "極簡時尚皮革雙肩包", quantity: 1, price: 2480 },
      { name: "極細纖維旅行毛巾 (藍)", quantity: 2, price: 600 }
    ]
  },
  {
    id: "ORD-2026-0502",
    customer: {
      name: "林雅婷",
      email: "yating.lin@example.com",
      phone: "0928-111-222",
      address: "新北市板橋區縣民大道二段7號"
    },
    date: "2026-05-22 09:30",
    total: 1250,
    paymentStatus: "已付款",
    shipmentStatus: "已送達",
    shippingMethod: "超商取貨 (7-11)",
    trackingNumber: "UN-99238128",
    paymentMethod: "LINE Pay",
    items: [
      { name: "抗UV輕量折疊傘 (墨綠)", quantity: 1, price: 650 },
      { name: "不鏽鋼雙層保溫杯 500ml", quantity: 1, price: 600 }
    ]
  },
  {
    id: "ORD-2026-0503",
    customer: {
      name: "張建國",
      email: "jianguo.zhang@example.com",
      phone: "0935-666-777",
      address: "台中市西屯區台灣大道三段99號"
    },
    date: "2026-05-21 18:45",
    total: 15800,
    paymentStatus: "待付款",
    shipmentStatus: "未出貨",
    shippingMethod: "黑貓宅急便",
    trackingNumber: "",
    paymentMethod: "ATM 轉帳",
    items: [
      { name: "27吋 IPS 4K 專業螢幕", quantity: 1, price: 12900 },
      { name: "人體工學記憶棉靠墊", quantity: 2, price: 1450 }
    ]
  },
  {
    id: "ORD-2026-0504",
    customer: {
      name: "黃秋雅",
      email: "chiuya.huang@example.com",
      phone: "0918-777-888",
      address: "高雄市苓雅區四維三路2號"
    },
    date: "2026-05-21 14:20",
    total: 4890,
    paymentStatus: "已付款",
    shipmentStatus: "已出貨",
    shippingMethod: "郵局快捷",
    trackingNumber: "POST-881239",
    paymentMethod: "信用卡",
    items: [
      { name: "無線降噪耳罩式耳機", quantity: 1, price: 4200 },
      { name: "真皮多功能理線器", quantity: 3, price: 230 }
    ]
  },
  {
    id: "ORD-2026-0505",
    customer: {
      name: "李志豪",
      email: "chihao.lee@example.com",
      phone: "0975-222-333",
      address: "桃園市中壢區中大路300號"
    },
    date: "2026-05-20 11:10",
    total: 890,
    paymentStatus: "已退款",
    shipmentStatus: "未出貨",
    shippingMethod: "超商取貨 (全家)",
    trackingNumber: "",
    paymentMethod: "LINE Pay",
    items: [
      { name: "簡約純棉家居服套裝", quantity: 1, price: 890 }
    ]
  },
  {
    id: "ORD-2026-0506",
    customer: {
      name: "曾美玲",
      email: "meiling.tseng@example.com",
      phone: "0988-333-444",
      address: "新竹市東區光復路二段101號"
    },
    date: "2026-05-20 08:05",
    total: 3250,
    paymentStatus: "已付款",
    shipmentStatus: "已送達",
    shippingMethod: "黑貓宅急便",
    trackingNumber: "TC-88235541",
    paymentMethod: "信用卡",
    items: [
      { name: "智能香氛噴霧機", quantity: 1, price: 1800 },
      { name: "天然草本精油 (薰衣草/茶樹)", quantity: 2, price: 725 }
    ]
  },
  {
    id: "ORD-2026-0507",
    customer: {
      name: "王大同",
      email: "tatung.wang@example.com",
      phone: "0911-555-666",
      address: "台南市東區大學路1號"
    },
    date: "2026-05-19 16:30",
    total: 2150,
    paymentStatus: "待付款",
    shipmentStatus: "未出貨",
    shippingMethod: "超商取貨 (7-11)",
    trackingNumber: "",
    paymentMethod: "貨到付款",
    items: [
      { name: "多功能不沾料理鍋", quantity: 1, price: 1680 },
      { name: "矽膠耐熱防燙夾", quantity: 2, price: 235 }
    ]
  },
  {
    id: "ORD-2026-0508",
    customer: {
      name: "趙麗華",
      email: "lihua.chao@example.com",
      phone: "0933-999-000",
      address: "基隆市中正區北寧路2號"
    },
    date: "2026-05-19 13:12",
    total: 9500,
    paymentStatus: "已付款",
    shipmentStatus: "已出貨",
    shippingMethod: "黑貓宅急便",
    trackingNumber: "TC-88239011",
    paymentMethod: "信用卡",
    items: [
      { name: "復古藍牙機械鍵盤", quantity: 2, price: 3800 },
      { name: "人體工學滑鼠墊", quantity: 2, price: 950 }
    ]
  },
  {
    id: "ORD-2026-0509",
    customer: {
      name: "劉德華",
      email: "andy.liu@example.com",
      phone: "0999-888-777",
      address: "台北市大安區敦化南路二段100號"
    },
    date: "2026-05-18 20:00",
    total: 7800,
    paymentStatus: "已付款",
    shipmentStatus: "已送達",
    shippingMethod: "黑貓宅急便",
    trackingNumber: "TC-88223849",
    paymentMethod: "信用卡",
    items: [
      { name: "真無線降噪運動耳機", quantity: 1, price: 5900 },
      { name: "運動防水臂套", quantity: 2, price: 950 }
    ]
  },
  {
    id: "ORD-2026-0510",
    customer: {
      name: "蔡依玲",
      email: "jolin.tsai@example.com",
      phone: "0955-444-333",
      address: "新北市新莊區中正路510號"
    },
    date: "2026-05-18 10:45",
    total: 1850,
    paymentStatus: "已付款",
    shipmentStatus: "已送達",
    shippingMethod: "超商取貨 (全家)",
    trackingNumber: "UN-99225571",
    paymentMethod: "LINE Pay",
    items: [
      { name: "雙向快速充電行動電源 10000mAh", quantity: 1, price: 950 },
      { name: "編織 USB-C 快充線 1.5m", quantity: 3, price: 300 }
    ]
  }
];

export const revenueData = [
  { month: "12月", revenue: 320000, orders: 280, profit: 128000 },
  { month: "1月", revenue: 450000, orders: 380, profit: 180000 },
  { month: "2月", revenue: 380000, orders: 310, profit: 152000 },
  { month: "3月", revenue: 520000, orders: 450, profit: 208000 },
  { month: "4月", revenue: 490000, orders: 410, profit: 196000 },
  { month: "5月", revenue: 580000, orders: 500, profit: 242000 }
];

export const weeklyData = [
  { name: "週一", revenue: 45000, orders: 35 },
  { name: "週二", revenue: 52000, orders: 42 },
  { name: "週三", revenue: 49000, orders: 38 },
  { name: "週四", revenue: 61000, orders: 51 },
  { name: "週五", revenue: 78000, orders: 65 },
  { name: "週六", revenue: 95000, orders: 82 },
  { name: "週日", revenue: 88000, orders: 74 }
];

export const categoryData = [
  { name: "3C 數位", value: 385000, percentage: 42, color: "#6366f1" },
  { name: "居家生活", value: 220000, percentage: 24, color: "#10b981" },
  { name: "服飾配件", value: 165000, percentage: 18, color: "#8b5cf6" },
  { name: "運動戶外", value: 110000, percentage: 12, color: "#f59e0b" },
  { name: "其他類別", value: 36000, percentage: 4, color: "#ec4899" }
];

export const overallStats = {
  totalRevenue: 2420000,
  revenueGrowth: "+18.4%",
  totalOrders: 2330,
  ordersGrowth: "+12.1%",
  pendingShipments: 12,
  pendingPayments: 8,
  avgOrderValue: 1038,
  refundRate: "0.8%"
};
