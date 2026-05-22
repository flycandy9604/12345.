import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Truck, 
  BarChart3, 
  Settings, 
  Menu, 
  ChevronLeft,
  Store
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, sidebarOpen, setSidebarOpen }) {
  const menuItems = [
    { id: 'overview', name: '儀表板總覽', icon: LayoutDashboard },
    { id: 'orders', name: '訂單管理', icon: ShoppingBag },
    { id: 'shipment', name: '出貨管理', icon: Truck },
    { id: 'revenue', name: '營收統計', icon: BarChart3 },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo-area">
          <div className="logo-icon">
            <Store size={22} className="neon-text" />
          </div>
          {sidebarOpen && <span className="logo-text">AURA <span className="logo-accent">Admin</span></span>}
        </div>
        <button 
          className="sidebar-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Sidebar"
        >
          <ChevronLeft size={16} className={`toggle-icon ${!sidebarOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentTab(item.id)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon size={20} className="nav-icon" />
                  {sidebarOpen && <span className="nav-text">{item.name}</span>}
                  {isActive && <div className="active-indicator" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item settings-btn" title={!sidebarOpen ? "系統設定" : undefined}>
          <Settings size={20} className="nav-icon" />
          {sidebarOpen && <span className="nav-text">系統設定</span>}
        </button>
        {sidebarOpen && (
          <div className="sidebar-profile">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Admin Profile" 
              className="profile-avatar"
            />
            <div className="profile-info">
              <span className="profile-name">陳雨柔</span>
              <span className="profile-role">高級管理員</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
