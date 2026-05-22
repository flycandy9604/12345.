import React from 'react';
import { 
  DollarSign, 
  ShoppingBag, 
  Truck, 
  Clock, 
  ArrowUpRight, 
  TrendingUp, 
  Users, 
  Percent
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockOrders, revenueData, categoryData, overallStats } from '../data/mockData';

export default function DashboardOverview({ setCurrentTab, setSelectedOrder, setIsDetailOpen }) {
  // 取得最新 4 筆訂單
  const recentOrders = mockOrders.slice(0, 4);

  // 格式化數字為台幣 (NT$)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value);
  };

  const statCards = [
    {
      title: "今日總營收",
      value: formatCurrency(overallStats.totalRevenue),
      change: overallStats.revenueGrowth,
      isPositive: true,
      icon: DollarSign,
      colorClass: "indigo",
      gradient: "var(--gradient-card-1)"
    },
    {
      title: "總訂單數",
      value: `${overallStats.totalOrders} 筆`,
      change: overallStats.ordersGrowth,
      isPositive: true,
      icon: ShoppingBag,
      colorClass: "emerald",
      gradient: "var(--gradient-card-2)"
    },
    {
      title: "待出貨管理",
      value: `${overallStats.pendingShipments} 筆`,
      change: "需今日處理",
      isPositive: false,
      icon: Truck,
      colorClass: "amber",
      gradient: "var(--gradient-card-3)"
    },
    {
      title: "待付款訂單",
      value: `${overallStats.pendingPayments} 筆`,
      change: "待金流確認",
      isPositive: null,
      icon: Clock,
      colorClass: "violet",
      gradient: "var(--gradient-card-4)"
    }
  ];

  return (
    <div className="dashboard-overview">
      {/* 頂部數據卡片網格 */}
      <div className="stats-grid">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className={`glass-card stat-card glass-card-glow-${card.colorClass}`}
              style={{ background: card.gradient }}
            >
              <div className="stat-card-header">
                <span className="stat-title">{card.title}</span>
                <div className={`stat-icon-wrapper ${card.colorClass}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="stat-card-body">
                <h3 className="stat-value">{card.value}</h3>
                <div className="stat-footer">
                  {card.isPositive !== null && (
                    <span className={`stat-change ${card.isPositive ? 'positive' : 'negative'}`}>
                      {card.isPositive ? '↑' : '↓'} {card.change}
                    </span>
                  )}
                  {card.isPositive === null && (
                    <span className="stat-change info">{card.change}</span>
                  )}
                  <span className="stat-period">較上月同期</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 圖表區塊 */}
      <div className="charts-grid">
        {/* 營收趨勢圖 */}
        <div className="glass-card chart-card revenue-trend-card">
          <div className="card-header">
            <div>
              <h3 className="card-title">營收與淨利潤趨勢</h3>
              <p className="card-subtitle">過去六個月的電商業績增長軌跡</p>
            </div>
            <div className="trend-badge">
              <TrendingUp size={16} />
              <span>年增長率 +18.4%</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--text-muted)" 
                  tickLine={false} 
                  axisLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="var(--text-muted)" 
                  tickLine={false} 
                  axisLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--glass-border)',
                    borderRadius: '8px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-primary)'
                  }} 
                />
                <Area type="monotone" dataKey="revenue" name="營業收入" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="profit" name="淨利潤" stroke="var(--color-success)" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 商品分類佔比圖 */}
        <div className="glass-card chart-card category-share-card">
          <div className="card-header">
            <h3 className="card-title">熱銷分類佔比</h3>
            <p className="card-subtitle">當月各產品大類的销售結構</p>
          </div>
          <div className="pie-chart-container">
            <div className="pie-chart-wrapper">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{ 
                      backgroundColor: 'var(--bg-secondary)', 
                      borderColor: 'var(--glass-border)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pie-center-text">
                <span className="pie-center-val">42%</span>
                <span className="pie-center-lbl">3C 數位</span>
              </div>
            </div>
            
            <div className="pie-legend">
              {categoryData.map((item, idx) => (
                <div key={idx} className="legend-item">
                  <div className="legend-marker" style={{ backgroundColor: item.color }} />
                  <span className="legend-name">{item.name}</span>
                  <span className="legend-percentage">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 下方：最近訂單與次要指標 */}
      <div className="bottom-grid">
        {/* 最新訂單列表 */}
        <div className="glass-card table-card recent-orders-card">
          <div className="card-header flex-header">
            <div>
              <h3 className="card-title">最新訂單通知</h3>
              <p className="card-subtitle">今日系統即時湧入的買家消費紀錄</p>
            </div>
            <button className="btn-secondary btn-sm" onClick={() => setCurrentTab('orders')}>
              檢視全部訂單 <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>訂單編號</th>
                  <th>顧客名稱</th>
                  <th>購買日期</th>
                  <th>實付金額</th>
                  <th>付款狀態</th>
                  <th>出貨進度</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-indigo font-bold">{order.id}</td>
                    <td>
                      <div className="cust-info">
                        <span className="cust-name">{order.customer.name}</span>
                        <span className="cust-email desktop-only">{order.customer.email}</span>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>{formatCurrency(order.total)}</td>
                    <td>
                      <span className={`badge ${
                        order.paymentStatus === '已付款' ? 'badge-paid' : 
                        order.paymentStatus === '待付款' ? 'badge-pending' : 'badge-refunded'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${
                        order.shipmentStatus === '未出貨' ? 'badge-unshipped' : 
                        order.shipmentStatus === '出貨中' ? 'badge-shipping' : 
                        order.shipmentStatus === '已出貨' ? 'badge-shipped' : 'badge-delivered'
                      }`}>
                        {order.shipmentStatus}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn-secondary btn-xs"
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsDetailOpen(true);
                        }}
                      >
                        詳情
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 財務摘要卡片 */}
        <div className="glass-card ratio-summary-card">
          <div className="card-header">
            <h3 className="card-title">營運健康指標</h3>
            <p className="card-subtitle">分析當前銷售與客戶黏性數據</p>
          </div>
          <div className="ratios-container">
            <div className="ratio-item">
              <div className="ratio-info">
                <span>平均客單價 (AOV)</span>
                <span className="ratio-value">{formatCurrency(overallStats.avgOrderValue)}</span>
              </div>
              <div className="ratio-progress-bar">
                <div className="ratio-progress-fill" style={{ width: '75%', background: 'var(--gradient-primary)' }} />
              </div>
              <div className="ratio-footer">
                <span>較上季提升 5.8%</span>
              </div>
            </div>
            
            <div className="ratio-item">
              <div className="ratio-info">
                <span>訂單退款率 (Refund Rate)</span>
                <span className="ratio-value text-success">{overallStats.refundRate}</span>
              </div>
              <div className="ratio-progress-bar">
                <div className="ratio-progress-fill" style={{ width: '8%', backgroundColor: 'var(--color-success)' }} />
              </div>
              <div className="ratio-footer">
                <span>優於產業標準 (平均 1.5%)</span>
              </div>
            </div>

            <div className="ratio-item">
              <div className="ratio-info">
                <span>新客獲取佔比</span>
                <span className="ratio-value">64.2%</span>
              </div>
              <div className="ratio-progress-bar">
                <div className="ratio-progress-fill" style={{ width: '64.2%', backgroundColor: 'var(--color-secondary)' }} />
              </div>
              <div className="ratio-footer">
                <span>本月新增 1,495 位會員</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
