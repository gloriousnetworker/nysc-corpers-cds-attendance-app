'use client';
import { useState } from 'react';

export default function DashboardSidebar({ activeSection, setActiveSection }) {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: '📊', color: 'bg-blue-500' },
    { id: 'attendance', label: 'Attendance Tracker', icon: '📝', color: 'bg-green-500' },
    { id: 'profile', label: 'My Profile', icon: '👤', color: 'bg-purple-500' },
    { id: 'dues', label: 'CDS Dues', icon: '💰', color: 'bg-yellow-500' },
    { id: 'schedule', label: 'CDS Schedule', icon: '📅', color: 'bg-indigo-500' },
    { id: 'reports', label: 'Reports & Analytics', icon: '📈', color: 'bg-pink-500' },
    { id: 'settings', label: 'Account Settings', icon: '⚙️', color: 'bg-gray-500' },
    { id: 'help', label: 'Help & Support', icon: '❓', color: 'bg-red-500' }
  ];

  return (
    <aside className={`hidden md:block bg-white shadow-lg ${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 h-[calc(100vh-4rem)] sticky top-16`}>
      <div className="p-4 border-b border-gray-200">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg"
        >
          {collapsed ? '→' : '← Collapse'}
        </button>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map(item => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center p-3 rounded-lg transition ${
                  activeSection === item.id
                    ? 'bg-[#008753] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={`${item.color} w-8 h-8 rounded-full flex items-center justify-center mr-3`}>
                  {item.icon}
                </span>
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {!collapsed && (
        <div className="p-4 border-t border-gray-200 mt-4">
          <div className="text-sm text-gray-600 mb-2">Quick Actions</div>
          <button className="w-full bg-[#008753] text-white py-2 px-4 rounded-lg hover:bg-[#006b42] transition font-medium">
            Mark Today's Attendance
          </button>
        </div>
      )}
    </aside>
  );
}