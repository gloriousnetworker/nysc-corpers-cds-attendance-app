'use client';
import { useState, useEffect } from 'react';

export default function SettingsSection({ userData, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      sms: false,
      push: true,
      reminders: true
    },
    privacy: {
      profileVisibility: 'public',
      showAttendance: true,
      showContact: false
    },
    security: {
      twoFactor: false,
      loginAlerts: true
    },
    preferences: {
      language: 'en',
      timezone: 'WAT'
    }
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('nysc_user_settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('nysc_user_settings', JSON.stringify(newSettings));
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

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

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
                        onClick={handleThemeToggle}
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
                          onClick={handleThemeToggle}
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
                        <div className={`w-12 h-6 rounded-full transition ${settings.notifications.reminders ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            settings.notifications.reminders ? 'left-7' : 'left-1'
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
          )}

          {activeTab === 'notifications' && (
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
                      onClick={() => handleToggle('notifications', 'email')} 
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
                      onClick={() => handleToggle('notifications', 'sms')} 
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
                      onClick={() => handleToggle('notifications', 'push')} 
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
                      onClick={() => handleToggle('notifications', 'reminders')} 
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
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Privacy Settings</h3>
              
              <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="space-y-6">
                  <div>
                    <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Profile Visibility
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['public', 'private', 'contacts'].map(visibility => (
                        <button
                          key={visibility}
                          onClick={() => handleSelectChange('privacy', 'profileVisibility', visibility)}
                          className={`p-4 rounded-lg text-center border-2 capitalize ${
                            settings.privacy.profileVisibility === visibility
                              ? 'border-[#008753] bg-green-100 dark:bg-green-900/30'
                              : `${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'}`
                          }`}
                        >
                          <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>{visibility}</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {visibility === 'public' && 'Visible to all users'}
                            {visibility === 'private' && 'Only you can see'}
                            {visibility === 'contacts' && 'Visible to CDS group'}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Show Attendance to Others</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Allow others to view your attendance record</div>
                      </div>
                      <button 
                        onClick={() => handleToggle('privacy', 'showAttendance')} 
                        className="relative focus:outline-none"
                      >
                        <div className={`w-12 h-6 rounded-full transition ${settings.privacy.showAttendance ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            settings.privacy.showAttendance ? 'left-7' : 'left-1'
                          }`}></div>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Show Contact Information</div>
                        <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Display phone and email to CDS members</div>
                      </div>
                      <button 
                        onClick={() => handleToggle('privacy', 'showContact')} 
                        className="relative focus:outline-none"
                      >
                        <div className={`w-12 h-6 rounded-full transition ${settings.privacy.showContact ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                            settings.privacy.showContact ? 'left-7' : 'left-1'
                          }`}></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`rounded-xl p-6 ${darkMode ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200'}`}>
                <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Data Privacy</h4>
                <p className={`mb-4 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                  Your data is protected in accordance with our privacy policy. You can request data deletion at any time.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className={`px-6 py-2 rounded-lg font-medium ${
                    darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}>
                    Download My Data
                  </button>
                  <button className={`px-6 py-2 rounded-lg font-medium ${
                    darkMode ? 'border-red-800 text-red-400 hover:bg-red-900/30' : 'border-red-300 text-red-700 hover:bg-red-50'
                  }`}>
                    Request Deletion
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Security Settings</h3>
              
              <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Two-Factor Authentication</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Add an extra layer of security</div>
                    </div>
                    <button 
                      onClick={() => handleToggle('security', 'twoFactor')} 
                      className="relative focus:outline-none"
                    >
                      <div className={`w-12 h-6 rounded-full transition ${settings.security.twoFactor ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.security.twoFactor ? 'left-7' : 'left-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Login Alerts</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notify you of new sign-ins</div>
                    </div>
                    <button 
                      onClick={() => handleToggle('security', 'loginAlerts')} 
                      className="relative focus:outline-none"
                    >
                      <div className={`w-12 h-6 rounded-full transition ${settings.security.loginAlerts ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          settings.security.loginAlerts ? 'left-7' : 'left-1'
                        }`}></div>
                      </div>
                    </button>
                  </div>

                  <div>
                    <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Change Password</h4>
                    <button className="px-6 py-3 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] font-medium">
                      Update Password
                    </button>
                  </div>

                  <div>
                    <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Sessions</h4>
                    <div className="space-y-3">
                      <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <div>
                          <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Current Session</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chrome • Lagos, Nigeria</div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium">
                          Log Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Account Settings</h3>
              
              <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="space-y-6">
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Account Status</div>
                        <div className="text-green-600 dark:text-green-400 font-semibold">Active</div>
                      </div>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Member Since</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>March 2024</div>
                      </div>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Account Type</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Corps Member</div>
                      </div>
                      <div>
                        <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>CDS Group</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{userData?.cdsGroup}</div>
                      </div>
                    </div>
                  </div>

                  <div className={`pt-6 ${darkMode ? 'border-gray-700' : 'border-t'}`}>
                    <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Account Actions</h4>
                    <div className="space-y-4">
                      <button className={`w-full text-left p-4 rounded-lg ${
                        darkMode ? 'border-gray-700 text-blue-400 hover:bg-gray-700' : 'border-gray-300 text-blue-600 hover:bg-gray-50'
                      }`}>
                        <div className="font-medium">Upgrade Account</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Access premium features</div>
                      </button>
                      <button className={`w-full text-left p-4 rounded-lg ${
                        darkMode ? 'border-gray-700 text-yellow-400 hover:bg-gray-700' : 'border-gray-300 text-yellow-600 hover:bg-gray-50'
                      }`}>
                        <div className="font-medium">Export Account Data</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Download all your information</div>
                      </button>
                      <button className={`w-full text-left p-4 rounded-lg ${
                        darkMode ? 'border-red-800 text-red-400 hover:bg-red-900/20' : 'border-red-300 text-red-600 hover:bg-red-50'
                      }`}>
                        <div className="font-medium">Deactivate Account</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Temporarily disable your account</div>
                      </button>
                      <button className={`w-full text-left p-4 rounded-lg ${
                        darkMode ? 'border-red-800 text-red-400 hover:bg-red-900/20' : 'border-red-300 text-red-600 hover:bg-red-50'
                      }`}>
                        <div className="font-medium">Delete Account</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Permanently remove your account</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}