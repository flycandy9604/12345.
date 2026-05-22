import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Download, 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard,
  Truck,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function OrderManagement({ orders, updateOrder, deleteOrder, setSelectedOrder, setIsDetailOpen, selectedOrder, isDetailOpen }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('全部');
  const [shipmentFilter, setShipmentFilter] = useState('全部');

  // 格式化數字為台幣 (NT$)
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value);
  };

  // 搜尋與篩選邏輯
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.phone.includes(searchTerm);
    
    const matchesPayment = paymentFilter === '全部' || order.paymentStatus === paymentFilter;
    const matchesShipment = shipmentFilter === '全部' || order.shipmentStatus === shipmentFilter;

    return matchesSearch && matchesPayment && matchesShipment;
  });

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    setSelectedOrder(null);
  };

  // 快速更改付款狀態
  const handleTogglePayment = (orderId, newStatus) => {
    updateOrder(orderId, { paymentStatus: newStatus });
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, paymentStatus: newStatus }));
    }
  };

  return (
    <div className="order-management">
      {/* 搜尋與篩選面板 */}
      <div className="glass-card filter-card">
        <div className="filter-row">
          <div className="search-group">
            <label className="filter-label">搜尋訂單</label>
            <div className="search-input-wrapper">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="輸入訂單編號、顧客姓名或電話..." 
                className="input-field"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">付款狀態</label>
            <div className="select-wrapper">
              <select 
                className="input-field select-field"
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
              >
                <option value="全部">全部付款狀態</option>
                <option value="已付款">已付款</option>
                <option value="待付款">待付款</option>
                <option value="已退款">已退款</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">出貨狀態</label>
            <div className="select-wrapper">
              <select 
                className="input-field select-field"
                value={shipmentFilter}
                onChange={(e) => setSidebarOpen ? setShipmentFilter(e.target.value) : setShipmentFilter(e.target.value)}
              >
                <option value="全部">全部出貨狀態</option>
                <option value="未出貨">未出貨</option>
                <option value="出貨中">出貨中</option>
                <option value="已出貨">已出貨</option>
                <option value="已送達">已送達</option>
              </select>
            </div>
          </div>

          <div className="action-group">
            <button className="btn-secondary excel-btn">
              <Download size={16} /> 匯出 CSV
            </button>
          </div>
        </div>
      </div>

      {/* 訂單列表 */}
      <div className="glass-card table-card list-card">
        <div className="card-header flex-header">
          <div>
            <h3 className="card-title">訂單清單 ({filteredOrders.length} 筆)</h3>
            <p className="card-subtitle">檢視、篩選及維護所有訂單詳細資料</p>
          </div>
        </div>

        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>顧客資料</th>
                <th>下單時間</th>
                <th>商品內容</th>
                <th>訂單總額</th>
                <th>付款狀態</th>
                <th>出貨狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="font-mono text-indigo font-bold">{order.id}</td>
                    <td>
                      <div className="cust-info">
                        <span className="cust-name">{order.customer.name}</span>
                        <span className="cust-email">{order.customer.phone}</span>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td>
                      <div className="order-items-summary">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="item-summary-line">
                            {item.name} x {item.quantity}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="font-bold">{formatCurrency(order.total)}</td>
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
                      <div className="action-buttons-cell">
                        <button 
                          className="btn-secondary btn-icon-sm"
                          onClick={() => handleOpenDetail(order)}
                          title="查看詳情"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          className="btn-secondary btn-icon-sm text-danger-hover"
                          onClick={() => deleteOrder(order.id)}
                          title="刪除訂單"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="empty-table-cell">
                    <div className="empty-state">
                      <AlertCircle size={40} className="text-muted" />
                      <p>沒有找到符合條件的訂單</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 訂單詳情彈窗 Modal */}
      {isDetailOpen && selectedOrder && (
        <div className="modal-overlay" onClick={handleCloseDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>訂單詳情: {selectedOrder.id}</h3>
              <button className="btn-icon modal-close-btn" onClick={handleCloseDetail}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              {/* 訂單基本資訊與狀態 */}
              <div className="modal-row grid-2">
                <div className="info-block glass-subcard">
                  <h4 className="info-block-title"><User size={16} /> 買家聯絡資訊</h4>
                  <div className="info-item"><span className="label">顧客姓名：</span><span className="val">{selectedOrder.customer.name}</span></div>
                  <div className="info-item"><span className="label">聯絡電話：</span><span className="val">{selectedOrder.customer.phone}</span></div>
                  <div className="info-item"><span className="label">電子信箱：</span><span className="val">{selectedOrder.customer.email}</span></div>
                  <div className="info-item"><span className="label">收件地址：</span><span className="val">{selectedOrder.customer.address}</span></div>
                </div>

                <div className="info-block glass-subcard">
                  <h4 className="info-block-title"><CreditCard size={16} /> 訂單狀態與變更</h4>
                  <div className="info-item"><span className="label">訂單時間：</span><span className="val">{selectedOrder.date}</span></div>
                  <div className="info-item">
                    <span className="label">付款狀態：</span>
                    <span className="val">
                      <span className={`badge ${
                        selectedOrder.paymentStatus === '已付款' ? 'badge-paid' : 
                        selectedOrder.paymentStatus === '待付款' ? 'badge-pending' : 'badge-refunded'
                      }`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">出貨進度：</span>
                    <span className="val">
                      <span className={`badge ${
                        selectedOrder.shipmentStatus === '未出貨' ? 'badge-unshipped' : 
                        selectedOrder.shipmentStatus === '出貨中' ? 'badge-shipping' : 
                        selectedOrder.shipmentStatus === '已出貨' ? 'badge-shipped' : 'badge-delivered'
                      }`}>
                        {selectedOrder.shipmentStatus}
                      </span>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="label">物流管道：</span>
                    <span className="val">{selectedOrder.shippingMethod}</span>
                  </div>
                </div>
              </div>

              {/* 商品細項明細 */}
              <div className="detail-section glass-subcard">
                <h4 className="info-block-title"><ShoppingBag size={16} /> 訂購商品明細</h4>
                <div className="items-list-table-wrapper">
                  <table className="items-list-table">
                    <thead>
                      <tr>
                        <th>商品名稱</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th className="text-right">小計</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.name}</td>
                          <td>{formatCurrency(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td className="text-right font-bold">{formatCurrency(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                      <tr className="summary-row">
                        <td colSpan="3" className="text-right">實付總額：</td>
                        <td className="text-right font-bold text-xl text-indigo">{formatCurrency(selectedOrder.total)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 物流與金流操作 */}
              <div className="detail-section glass-subcard">
                <h4 className="info-block-title">後台金流管理操作</h4>
                <div className="action-buttons-group">
                  {selectedOrder.paymentStatus === '待付款' && (
                    <button 
                      className="btn-primary"
                      onClick={() => handleTogglePayment(selectedOrder.id, '已付款')}
                    >
                      <CheckCircle size={16} /> 標記為「已付款」
                    </button>
                  )}
                  {selectedOrder.paymentStatus === '已付款' && (
                    <button 
                      className="btn-secondary text-danger-hover"
                      onClick={() => handleTogglePayment(selectedOrder.id, '已退款')}
                    >
                      <AlertCircle size={16} /> 執行退款程序
                    </button>
                  )}
                  {selectedOrder.paymentStatus === '已退款' && (
                    <button 
                      className="btn-secondary"
                      onClick={() => handleTogglePayment(selectedOrder.id, '已付款')}
                    >
                      回復付款狀態
                    </button>
                  )}
                  {selectedOrder.trackingNumber && (
                    <div className="tracking-display">
                      <Truck size={16} /> 物流單號: <span className="font-mono font-bold text-sky">{selectedOrder.trackingNumber}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
