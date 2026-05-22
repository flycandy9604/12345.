import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Search, 
  Edit3, 
  Clipboard,
  ShieldCheck
} from 'lucide-react';

export default function ShipmentManagement({ orders, updateOrder }) {
  const [activeStage, setActiveStage] = useState('全部');
  const [shipmentSearch, setShipmentSearch] = useState('');
  const [trackingInputs, setTrackingInputs] = useState({});

  // 統計各階段數量
  const getStageCount = (stage) => {
    if (stage === '全部') return orders.length;
    return orders.filter(o => o.shipmentStatus === stage).length;
  };

  // 處理物流狀態更新
  const handleTransitStatus = (orderId, currentStatus) => {
    let nextStatus = '';
    let extraFields = {};

    if (currentStatus === '未出貨') {
      nextStatus = '出貨中';
    } else if (currentStatus === '出貨中') {
      const trackNum = trackingInputs[orderId] || `TC-${Math.floor(10000000 + Math.random() * 90000000)}`;
      nextStatus = '已出貨';
      extraFields.trackingNumber = trackNum;
    } else if (currentStatus === '已出貨') {
      nextStatus = '已送達';
    }

    updateOrder(orderId, { shipmentStatus: nextStatus, ...extraFields });
  };

  const handleTrackingInputChange = (orderId, val) => {
    setTrackingInputs(prev => ({ ...prev, [orderId]: val }));
  };

  // 搜尋與狀態過濾
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(shipmentSearch.toLowerCase()) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(shipmentSearch.toLowerCase()));

    const matchesStage = activeStage === '全部' || order.shipmentStatus === activeStage;

    return matchesSearch && matchesStage;
  });

  const stages = [
    { id: '全部', name: '全部包裹', icon: Clipboard, color: 'indigo' },
    { id: '未出貨', name: '待出貨', icon: Clock, color: 'slate' },
    { id: '出貨中', name: '包裝出貨中', icon: Package, color: 'primary' },
    { id: '已出貨', name: '已發貨運輸中', icon: Truck, color: 'secondary' },
    { id: '已送達', name: '已妥投簽收', icon: ShieldCheck, color: 'success' },
  ];

  return (
    <div className="shipment-management">
      {/* 頂部出貨流程進度條看板 */}
      <div className="shipment-pipeline-banner">
        {stages.map((stage) => {
          const count = getStageCount(stage.id);
          const isActive = activeStage === stage.id;
          const StageIcon = stage.icon;
          return (
            <button 
              key={stage.id} 
              className={`pipeline-node glass-card ${isActive ? 'active-node' : ''}`}
              onClick={() => setActiveStage(stage.id)}
            >
              <div className={`node-icon-bg ${stage.color}`}>
                <StageIcon size={20} />
              </div>
              <div className="node-info">
                <span className="node-lbl">{stage.name}</span>
                <span className="node-count">{count} 筆</span>
              </div>
              {isActive && <div className="active-highlight-bar" />}
            </button>
          );
        })}
      </div>

      {/* 搜尋過濾 */}
      <div className="glass-card shipment-filter-card">
        <div className="search-input-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="搜尋物流訂單、買家姓名、物流單號..." 
            className="input-field"
            value={shipmentSearch}
            onChange={(e) => setShipmentSearch(e.target.value)}
          />
        </div>
      </div>

      {/* 出貨清單網格 */}
      <div className="shipment-cards-grid">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div key={order.id} className="glass-card shipment-card">
              <div className="shipment-card-header">
                <div>
                  <span className="ship-order-id font-mono">{order.id}</span>
                  <span className="ship-method">{order.shippingMethod}</span>
                </div>
                <span className={`badge ${
                  order.shipmentStatus === '未出貨' ? 'badge-unshipped' : 
                  order.shipmentStatus === '出貨中' ? 'badge-shipping' : 
                  order.shipmentStatus === '已出貨' ? 'badge-shipped' : 'badge-delivered'
                }`}>
                  {order.shipmentStatus}
                </span>
              </div>

              <div className="shipment-card-body">
                <div className="ship-customer-info">
                  <div className="info-row">
                    <span className="lbl">收件人：</span>
                    <span className="val">{order.customer.name} ({order.customer.phone})</span>
                  </div>
                  <div className="info-row">
                    <span className="lbl">地址：</span>
                    <span className="val">{order.customer.address}</span>
                  </div>
                  <div className="info-row items-row">
                    <span className="lbl">物品：</span>
                    <span className="val items-text">
                      {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
                    </span>
                  </div>
                </div>

                {/* 物流進度條示意 */}
                <div className="shipment-flow-progress">
                  <div className="flow-steps">
                    <div className="flow-step completed">
                      <div className="step-dot" />
                      <span className="step-lbl">成立</span>
                    </div>
                    <div className={`flow-step ${['出貨中', '已出貨', '已送達'].includes(order.shipmentStatus) ? 'completed' : ''}`}>
                      <div className="step-dot" />
                      <span className="step-lbl">撿貨</span>
                    </div>
                    <div className={`flow-step ${['已出貨', '已送達'].includes(order.shipmentStatus) ? 'completed' : ''}`}>
                      <div className="step-dot" />
                      <span className="step-lbl">配送</span>
                    </div>
                    <div className={`flow-step ${order.shipmentStatus === '已送達' ? 'completed' : ''}`}>
                      <div className="step-dot" />
                      <span className="step-lbl">簽收</span>
                    </div>
                  </div>
                  <div className="flow-bar">
                    <div 
                      className="flow-bar-fill" 
                      style={{
                        width: 
                          order.shipmentStatus === '未出貨' ? '15%' :
                          order.shipmentStatus === '出貨中' ? '50%' :
                          order.shipmentStatus === '已出貨' ? '80%' : '100%'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="shipment-card-footer">
                {order.shipmentStatus === '未出貨' && (
                  <button 
                    className="btn-primary w-full"
                    onClick={() => handleTransitStatus(order.id, order.shipmentStatus)}
                  >
                    開始包裝出貨 <ArrowRight size={16} />
                  </button>
                )}

                {order.shipmentStatus === '出貨中' && (
                  <div className="shipping-actions-wrapper">
                    <input 
                      type="text" 
                      placeholder="自訂單號 (或留空隨機生成)"
                      className="input-field tracking-input"
                      value={trackingInputs[order.id] || ''}
                      onChange={(e) => handleTrackingInputChange(order.id, e.target.value)}
                    />
                    <button 
                      className="btn-primary"
                      onClick={() => handleTransitStatus(order.id, order.shipmentStatus)}
                    >
                      發貨運輸 <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {order.shipmentStatus === '已出貨' && (
                  <div className="shipped-info-actions">
                    <div className="tracking-number-box">
                      <span className="lbl">快遞單號：</span>
                      <span className="val font-mono font-bold text-sky">{order.trackingNumber}</span>
                    </div>
                    <button 
                      className="btn-secondary w-full text-success-hover"
                      onClick={() => handleTransitStatus(order.id, order.shipmentStatus)}
                    >
                      確認簽收送達 <CheckCircle2 size={16} />
                    </button>
                  </div>
                )}

                {order.shipmentStatus === '已送達' && (
                  <div className="delivered-banner">
                    <CheckCircle2 size={16} className="text-success" />
                    <span>物流已妥投並完成簽收 (單號: {order.trackingNumber})</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card empty-shipments w-full">
            <div className="empty-state">
              <Package size={48} className="text-muted" />
              <p>無此物流階段之訂單包裹</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
