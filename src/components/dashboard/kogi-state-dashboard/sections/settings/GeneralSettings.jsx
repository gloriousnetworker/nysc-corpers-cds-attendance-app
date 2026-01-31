'use client';
import { useState, useEffect } from 'react';

export default function GeneralSettings({ darkMode, toggleDarkMode }) {
  const [settings, setSettings] = useState({
    preferences: {
      language: 'en',
      timezone: 'WAT'
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

  const handleSelectChange = (category, key, value) => {
    const updatedSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: value
      }
    };
    saveSettings(updatedSettings);
  };

  const handleToggle = (category, key) => {
    const updatedSettings = {
      ...settings,
      [category]: {
        ...settings[category],
        [key]: !settings[category][key]
      }
    };
    saveSettings(updatedSettings);
  };

  return (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>General Settings</h3>
      
      <div className="space-y-6">
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Appearance</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Theme Mode</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
                </div>
              </div>
              <button 
                onClick={toggleDarkMode}
                className="relative focus:outline-none"
              >
                <div className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                  darkMode ? 'bg-[#008753]' : 'bg-gray-300'
                }`}>
                  <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}></div>
                </div>
                <span className="sr-only">Toggle dark mode</span>
              </button>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                    {darkMode ? '🌙' : '☀️'}
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {darkMode ? 'Dark Mode' : 'Light Mode'}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    darkMode 
                      ? 'bg-gray-600 text-white hover:bg-gray-500' 
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {darkMode ? 'Switch to Light' : 'Switch to Dark'}
                </button>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Language Preference
              </label>
              <select
                value={settings.preferences.language}
                onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
                }`}
              >
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="yo">Yoruba</option>
                <option value="ha">Hausa</option>
                <option value="ig">Igbo</option>
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Time Zone
              </label>
              <select
                value={settings.preferences.timezone}
                onChange={(e) => handleSelectChange('preferences', 'timezone', e.target.value)}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
                }`}
              >
                <option value="WAT">West Africa Time (WAT)</option>
                <option value="GMT">Greenwich Mean Time (GMT)</option>
                <option value="EST">Eastern Standard Time (EST)</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Display Settings</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Show Welcome Message</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Display welcome message on login</div>
              </div>
              <button 
                onClick={() => handleToggle('notifications', 'reminders')} 
                className="relative focus:outline-none"
              >
                <div className={`w-12 h-6 rounded-full transition ${settings.notifications?.reminders ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    settings.notifications?.reminders ? 'left-7' : 'left-1'
                  }`}></div>
                </div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Compact View</div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Show more content in less space</div>
              </div>
              <button className="relative focus:outline-none">
                <div className={`w-12 h-6 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-400'}`}>
                  <div className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"></div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}