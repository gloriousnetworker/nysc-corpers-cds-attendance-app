'use client';
import { useState, useEffect } from 'react';

export default function NotificationsSettings({ darkMode }) {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      reminders: true
    }
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('nysc_user_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('nysc_user_settings', JSON.stringify(newSettings));
  };

  const handleToggle = (key) => {
    const updatedSettings = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    };
    saveSettings(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Notification Settings</h3>
      
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Email Notifications</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receive updates via email</div>
            </div>
            <button 
              onClick={() => handleToggle('email')} 
              className="relative focus:outline-none"
            >
              <div className={`w-12 h-6 rounded-full transition ${settings.notifications.email ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.notifications.email ? 'left-7' : 'left-1'
                }`}></div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>SMS Notifications</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receive text message alerts</div>
            </div>
            <button 
              onClick={() => handleToggle('sms')} 
              className="relative focus:outline-none"
            >
              <div className={`w-12 h-6 rounded-full transition ${settings.notifications.sms ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.notifications.sms ? 'left-7' : 'left-1'
                }`}></div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Push Notifications</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Browser and app notifications</div>
            </div>
            <button 
              onClick={() => handleToggle('push')} 
              className="relative focus:outline-none"
            >
              <div className={`w-12 h-6 rounded-full transition ${settings.notifications.push ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.notifications.push ? 'left-7' : 'left-1'
                }`}></div>
              </div>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Reminder Alerts</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>CDS meeting reminders</div>
            </div>
            <button 
              onClick={() => handleToggle('reminders')} 
              className="relative focus:outline-none"
            >
              <div className={`w-12 h-6 rounded-full transition ${settings.notifications.reminders ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.notifications.reminders ? 'left-7' : 'left-1'
                }`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
        <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Notification Frequency</h4>
        <p className={`mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Customize how often you receive different types of notifications
        </p>
        <button className={`px-6 py-2 rounded-lg font-medium ${
          darkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        }`}>
          Configure Frequency
        </button>
      </div>
    </div>
  );
}