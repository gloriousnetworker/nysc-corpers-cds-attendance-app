'use client';
import { useState } from 'react';
import GeneralSettings from './GeneralSettings';
import NotificationsSettings from './NotificationsSettings';
import PrivacySettings from './PrivacySettings';
import SecuritySettings from './SecuritySettings';
import AccountSettings from './AccountSettings';

export default function SettingsPage({ userData, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className={`rounded-xl p-6 sticky top-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Settings</h3>
            <div className="space-y-2">
              {['general', 'notifications', 'privacy', 'security', 'account'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    activeTab === tab
                      ? 'bg-[#008753] text-white'
                      : `${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`
                  }`}
                >
                  <span className="capitalize">{tab} Settings</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <GeneralSettings darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          )}
          
          {activeTab === 'notifications' && (
            <NotificationsSettings darkMode={darkMode} />
          )}
          
          {activeTab === 'privacy' && (
            <PrivacySettings darkMode={darkMode} />
          )}
          
          {activeTab === 'security' && (
            <SecuritySettings darkMode={darkMode} userData={userData} />
          )}
          
          {activeTab === 'account' && (
            <AccountSettings darkMode={darkMode} userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
}