import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  Globe, 
  Menu, 
  ChevronDown, 
  LogOut, 
  User, 
  ShieldAlert
} from 'lucide-react';

export default function Navbar({ currentTab, setSidebarOpen, sidebarOpen }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const getTitle = () => {
    switch (currentTab) {
      case 'overview':
        return '儀表板總覽';
      case 'orders':
        return '訂單管理系統';
      case 'shipment':
        return '出貨與物流管理';
      case 'revenue':
        return '營收與財務分析';
      default:
        return '後台管理系統';
    }
  };

  const notifications = [
    { id: 1, text: "系統偵測：今日營收已達預期目標 105%！", type: "success", time: "5 分鐘前" },
    { id: 2, text: "待出貨提醒：有 3 筆黑貓宅急便訂單即將逾期。", type: "warning", time: "15 分鐘前" },
    { id: 3, text: "退款申請：訂單 ORD-2026-0505 申請已付款退款。", type: "info", time: "1 小時前" }
  ];

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button 
          className="mobile-menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle Menu"
        >
          <Menu size={22} />
        </button>
        <h2 className="navbar-title">{getTitle()}</h2>
      </div>

      <div className="navbar-right">
        {/* 全域搜尋 */}
        <div className="navbar-search search-input-wrapper">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="搜尋後台功能或設定..." 
            className="input-field navbar-search-input"
          />
        </div>

        {/* 系統通知 */}
        <div className="navbar-action-item">
          <button 
            className="btn-icon badge-notification-container" 
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            onBlur={() => setTimeout(() => setNotificationsOpen(false), 200)}
          >
            <Bell size={20} />
            <span className="notification-dot"></span>
          </button>
          
          {notificationsOpen && (
            <div className="dropdown-panel notifications-dropdown">
              <div className="dropdown-header">
                <h4>系統通知</h4>
                <span className="clear-all">全部標記為已讀</span>
              </div>
              <ul className="notifications-list">
                {notifications.map(n => (
                  <li key={n.id} className="notification-item">
                    <div className={`notification-icon-indicator ${n.type}`} />
                    <div className="notification-content">
                      <p className="notification-text">{n.text}</p>
                      <span className="notification-time">{n.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 系統語言 */}
        <div className="navbar-action-item desktop-only">
          <button className="btn-icon">
            <Globe size={20} />
          </button>
        </div>

        {/* 使用者選單 */}
        <div className="user-profile-menu">
          <button 
            className="user-profile-trigger"
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 200)}
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Admin Profile" 
              className="navbar-avatar"
            />
            <span className="navbar-username desktop-only">陳雨柔</span>
            <ChevronDown size={14} className="desktop-only" />
          </button>

          {profileDropdownOpen && (
            <div className="dropdown-panel profile-dropdown">
              <a href="#profile" className="dropdown-item">
                <User size={16} />
                <span>個人資料設定</span>
              </a>
              <a href="#security" className="dropdown-item">
                <ShieldAlert size={16} />
                <span>安全性與日誌</span>
              </a>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout text-danger">
                <LogOut size={16} />
                <span>登出系統</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
