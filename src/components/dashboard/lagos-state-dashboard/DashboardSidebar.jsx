'use client';
import { useState } from 'react';

export default function DashboardSidebar({ activeSection, setActiveSection, darkMode, userData }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'attendance', label: 'Attendance Tracker', icon: '📝', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'profile', label: 'My Profile', icon: '👤', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'dues', label: 'CDS Dues', icon: '💰', color: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
    { id: 'schedule', label: 'CDS Schedule', icon: '📅', color: 'bg-gradient-to-r from-indigo-500 to-blue-500' },
    { id: 'marketplace', label: 'Marketplace', icon: '🛍️', color: 'bg-gradient-to-r from-pink-500 to-rose-500' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📈', color: 'bg-gradient-to-r from-orange-500 to-red-500' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️', color: 'bg-gradient-to-r from-gray-500 to-gray-700' },
    { id: 'help', label: 'Help & Support', icon: '❓', color: 'bg-gradient-to-r from-red-500 to-pink-500' }
  ];

  return (
    <aside className={`hidden md:block ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg ${collapsed ? 'w-16' : 'w-64'} transition-all duration-300 h-[calc(100vh-4rem)] sticky top-16`}>
      <div className={`p-3 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`w-full flex items-center justify-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>
      
      <nav className="p-3">
        <ul className="space-y-1">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-[#008753] to-[#1EB2A6] text-white'
                    : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                }`}
              >
                <span className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center text-white`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="font-medium ml-3 text-gray-800 dark:text-gray-300">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {!collapsed && (
        <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} mt-4`}>
          <div className={`text-xs font-semibold mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>LAGOS INFO</div>
          <div className="mb-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
            <div className="text-xs text-[#1EB2A6] dark:text-cyan-300 mb-1">Lagos Zone</div>
            <div className="font-bold text-[#008753] dark:text-green-400">Zone {userData?.cdsZone || '2'}</div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">{userData?.lga || 'Ikeja'} LGA</div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-[#008753] to-[#1EB2A6] text-white py-2 px-4 rounded-lg hover:opacity-90 transition font-medium text-sm mb-2">
            Mark Today's Attendance
          </button>
          <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition font-medium text-sm">
            Browse Marketplace
          </button>
          
          <div className="mt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">Wallet Balance</span>
              <span className="font-bold text-green-600 dark:text-green-400">₦6,800</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700 dark:text-gray-300">Active Listings</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">5</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}