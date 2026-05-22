import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardOverview from './components/DashboardOverview';
import OrderManagement from './components/OrderManagement';
import ShipmentManagement from './components/ShipmentManagement';
import RevenueAnalytics from './components/RevenueAnalytics';
import { mockOrders } from './data/mockData';

export default function App() {
  const [currentTab, setCurrentTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [orders, setOrders] = useState(mockOrders);
  
  // 詳情彈窗狀態 (共享於首頁與訂單頁)
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // 全域更新訂單狀態
  const updateOrder = (orderId, updatedFields) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, ...updatedFields } : order
      )
    );
  };

  // 全域刪除訂單
  const deleteOrder = (orderId) => {
    if (window.confirm(`確定要刪除訂單 ${orderId} 嗎？此操作不可逆。`)) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
      if (selectedOrder && selectedOrder.id === orderId) {
        setIsDetailOpen(false);
        setSelectedOrder(null);
      }
    }
  };

  // 根據當前分頁渲染組件
  const renderContent = () => {
    switch (currentTab) {
      case 'overview':
        return (
          <DashboardOverview 
            setCurrentTab={setCurrentTab}
            setSelectedOrder={setSelectedOrder}
            setIsDetailOpen={setIsDetailOpen}
          />
        );
      case 'orders':
        return (
          <OrderManagement 
            orders={orders}
            updateOrder={updateOrder}
            deleteOrder={deleteOrder}
            selectedOrder={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            isDetailOpen={isDetailOpen}
            setIsDetailOpen={setIsDetailOpen}
          />
        );
      case 'shipment':
        return (
          <ShipmentManagement 
            orders={orders}
            updateOrder={updateOrder}
          />
        );
      case 'revenue':
        return (
          <RevenueAnalytics />
        );
      default:
        return <DashboardOverview setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="app-container">
      {/* 左側導覽列 */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
      />

      {/* 右側佈局區 (含上方 Header 與主要內容) */}
      <div className={`main-layout ${!sidebarOpen ? 'collapsed' : ''}`}>
        <Navbar 
          currentTab={currentTab} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen} 
        />
        
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
