'use client';
import { useState } from 'react';

export default function MarketPlaceNavbar({ activeSection, setActiveSection, darkMode, messagesCount, notificationsCount, gemsCount, cartCount }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: 'browse', label: 'Browse', icon: '🛍️' },
    { id: 'listings', label: 'My Listings', icon: '📋' },
    { id: 'cart', label: 'Cart', icon: '🛒', badge: cartCount },
    { id: 'messages', label: 'Messages', icon: '💬', badge: messagesCount },
    { id: 'notifications', label: 'Alerts', icon: '🔔', badge: notificationsCount },
    { id: 'gems', label: 'Gems', icon: '💎', badge: gemsCount }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className={`rounded-xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center px-4 py-2 rounded-lg transition relative ${
                activeSection === item.id
                  ? 'bg-[#008753] text-white'
                  : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
              }`}
            >
              <span className="text-lg mr-2">{item.icon}</span>
              <span className="font-medium hidden sm:inline">{item.label}</span>
              {item.badge > 0 && (
                <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center ${
                  activeSection === item.id
                    ? 'bg-white text-[#008753]'
                    : 'bg-red-500 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          {showSearch ? (
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search items..."
                className={`px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
                }`}
                autoFocus
              />
              <button type="submit" className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}>
                🔍
              </button>
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className={`px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              onClick={() => setShowSearch(true)}
              className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Search"
            >
              🔍
            </button>
          )}
          
          <button className={`flex items-center px-4 py-2 rounded-lg font-medium ${
            darkMode ? 'bg-purple-700 text-white hover:bg-purple-600' : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}>
            <span className="mr-2">➕</span>
            <span className="hidden sm:inline">Sell Item</span>
          </button>
        </div>
      </div>
    </div>
  );
}