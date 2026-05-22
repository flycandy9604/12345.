import React, { useState } from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar,
  Percent,
  Calculator
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { revenueData, weeklyData, categoryData, overallStats } from '../data/mockData';

export default function RevenueAnalytics() {
  const [timeRange, setTimeRange] = useState('6months');

  // 格式化數字為台幣 (NT$)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value);
  };

  // 根據選擇的時間範圍篩選模擬數據
  const getFilteredRevenueData = () => {
    if (timeRange === '3months') {
      return revenueData.slice(-3);
    }
    return revenueData;
  };

  const currentRevenueData = getFilteredRevenueData();

  const analyticMetrics = [
    {
      title: "累計營業額",
      value: formatCurrency(overallStats.totalRevenue),
      change: "+12.4%",
      isPositive: true,
      desc: "相比上季度累計",
      icon: DollarSign,
      color: "var(--color-primary)"
    },
    {
      title: "淨利潤 (Net Profit)",
      value: formatCurrency(overallStats.totalRevenue * 0.42),
      change: "+15.8%",
      isPositive: true,
      desc: "平均淨利潤率 42%",
      icon: Calculator,
      color: "var(--color-success)"
    },
    {
      title: "平均客單價 (AOV)",
      value: formatCurrency(overallStats.avgOrderValue),
      change: "+5.3%",
      isPositive: true,
      desc: "每筆訂單平均消費額",
      icon: ShoppingBag,
      color: "var(--color-secondary)"
    },
    {
      title: "平均金流手續費",
      value: "2.15%",
      change: "-0.4%",
      isPositive: true, // 費率下降是好的，所以為 positive
      desc: "金流收單管道成本",
      icon: CreditCard,
      color: "var(--color-warning)"
    }
  ];

  return (
    <div className="revenue-analytics">
      {/* 篩選與工具列 */}
      <div className="glass-card tools-bar-card">
        <div className="analytics-toolbar">
          <div className="toolbar-left">
            <Calendar size={18} className="text-muted" />
            <span className="toolbar-label">統計時間範圍：</span>
            <div className="tabs-group">
              <button 
                className={`tab-btn ${timeRange === '3months' ? 'active' : ''}`}
                onClick={() => setTimeRange('3months')}
              >
                過去 3 個月
              </button>
              <button 
                className={`tab-btn ${timeRange === '6months' ? 'active' : ''}`}
                onClick={() => setTimeRange('6months')}
              >
                過去 6 個月
              </button>
            </div>
          </div>
          <button className="btn-primary">
            <Download size={16} /> 匯出完整財務報表
          </button>
        </div>
      </div>

      {/* 營收指標網格 */}
      <div className="analytics-metrics-grid">
        {analyticMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-card metric-item-card">
              <div className="metric-header">
                <span className="metric-title">{m.title}</span>
                <div className="metric-icon-box" style={{ color: m.color, backgroundColor: `${m.color}15` }}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="metric-body">
                <h3 className="metric-val">{m.value}</h3>
                <div className="metric-footer">
                  <span className={`change-pct ${m.isPositive ? 'up' : 'down'}`}>
                    {m.isPositive ? '↑' : '↓'} {m.change}
                  </span>
                  <span className="change-desc">{m.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 營收圖表網格 */}
      <div className="revenue-charts-grid">
        {/* 月度營收淨利對比 (Bar Chart) */}
        <div className="glass-card revenue-chart-item">
          <div className="card-header">
            <h3 className="card-title">營收與淨利潤月度對比</h3>
            <p className="card-subtitle">按月分析銷售成本 (COGS) 與利潤空間</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={currentRevenueData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--glass-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: 10 }}
                  iconType="circle"
                />
                <Bar dataKey="revenue" name="營業總收入" fill="var(--color-primary)" radius={[4, 4, 0, 0]} barSize={24} />
                <Bar dataKey="profit" name="純利潤" fill="var(--color-success)" radius={[4, 4, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 週訂單與營收走勢 (Line Chart) */}
        <div className="glass-card revenue-chart-item">
          <div className="card-header">
            <h3 className="card-title">週營收與訂單趨勢</h3>
            <p className="card-subtitle">分析一週內每日交易高峰時段</p>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={weeklyData} margin={{ top: 20, right: 15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--glass-border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: 10 }}
                  iconType="circle"
                />
                <Line type="monotone" dataKey="revenue" name="日營業額" stroke="var(--color-secondary)" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 類別銷量細節與導出 */}
      <div className="revenue-breakdown-panel glass-card">
        <div className="card-header">
          <h3 className="card-title">商品分類銷售績效分析</h3>
          <p className="card-subtitle">詳細評估熱銷品類的利潤貢獻率</p>
        </div>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>品類名稱</th>
                <th>當月總營業額</th>
                <th>銷量佔比</th>
                <th>毛利率 %</th>
                <th>退款率 %</th>
                <th>績效評估</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((item, idx) => (
                <tr key={idx}>
                  <td className="font-bold">{item.name}</td>
                  <td className="font-mono">{formatCurrency(item.value)}</td>
                  <td>
                    <div className="progress-bar-cell">
                      <span>{item.percentage}%</span>
                      <div className="cell-bar-bg">
                        <div className="cell-bar-fill" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  </td>
                  <td className="text-success font-bold">
                    {idx === 0 ? "48%" : idx === 1 ? "40%" : idx === 2 ? "52%" : idx === 3 ? "35%" : "28%"}
                  </td>
                  <td className="text-danger">
                    {idx === 0 ? "0.6%" : idx === 1 ? "1.2%" : idx === 2 ? "0.4%" : idx === 3 ? "1.8%" : "2.5%"}
                  </td>
                  <td>
                    <span className={`badge ${item.percentage >= 18 ? 'badge-paid' : 'badge-shipped'}`}>
                      {item.percentage >= 40 ? '超乎預期 (A+)' : item.percentage >= 18 ? '穩定成長 (A)' : '符合預期 (B)'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
