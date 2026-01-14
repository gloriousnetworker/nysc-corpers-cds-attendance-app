'use client';
import { useState } from 'react';

export default function SettingsSection({ userData }) {
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
      theme: 'light',
      language: 'en',
      timezone: 'WAT'
    }
  });

  const handleToggle = (category, key) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }));
  };

  const handleSelectChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Settings</h3>
            <div className="space-y-2">
              {['general', 'notifications', 'privacy', 'security', 'account'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    activeTab === tab
                      ? 'bg-[#008753] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
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
              <h3 className="text-2xl font-bold text-gray-800">General Settings</h3>
              
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Profile Preferences</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Display Theme
                      </label>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleSelectChange('preferences', 'theme', 'light')}
                          className={`p-4 border-2 rounded-lg ${settings.preferences.theme === 'light' ? 'border-[#008753] bg-green-50' : 'border-gray-300'}`}
                        >
                          <div className="font-medium">Light Mode</div>
                          <div className="text-sm text-gray-600">Default theme</div>
                        </button>
                        <button
                          onClick={() => handleSelectChange('preferences', 'theme', 'dark')}
                          className={`p-4 border-2 rounded-lg ${settings.preferences.theme === 'dark' ? 'border-[#008753] bg-green-50' : 'border-gray-300'}`}
                        >
                          <div className="font-medium">Dark Mode</div>
                          <div className="text-sm text-gray-600">Reduced eye strain</div>
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Language Preference
                      </label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => handleSelectChange('preferences', 'language', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="yo">Yoruba</option>
                        <option value="ha">Hausa</option>
                        <option value="ig">Igbo</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Time Zone
                      </label>
                      <select
                        value={settings.preferences.timezone}
                        onChange={(e) => handleSelectChange('preferences', 'timezone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent"
                      >
                        <option value="WAT">West Africa Time (WAT)</option>
                        <option value="GMT">Greenwich Mean Time (GMT)</option>
                        <option value="EST">Eastern Standard Time (EST)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Display Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Show Welcome Message</div>
                        <div className="text-sm text-gray-600">Display welcome message on login</div>
                      </div>
                      <button className="relative">
                        <div className={`w-12 h-6 rounded-full transition ${settings.notifications.reminders ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications.reminders ? 'left-7' : 'left-1'}`}></div>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Compact View</div>
                        <div className="text-sm text-gray-600">Show more content in less space</div>
                      </div>
                      <button className="relative">
                        <div className="w-12 h-6 rounded-full bg-gray-300">
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
              <h3 className="text-2xl font-bold text-gray-800">Notification Settings</h3>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Email Notifications</div>
                      <div className="text-sm text-gray-600">Receive updates via email</div>
                    </div>
                    <button onClick={() => handleToggle('notifications', 'email')} className="relative">
                      <div className={`w-12 h-6 rounded-full transition ${settings.notifications.email ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications.email ? 'left-7' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">SMS Notifications</div>
                      <div className="text-sm text-gray-600">Receive text message alerts</div>
                    </div>
                    <button onClick={() => handleToggle('notifications', 'sms')} className="relative">
                      <div className={`w-12 h-6 rounded-full transition ${settings.notifications.sms ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications.sms ? 'left-7' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Push Notifications</div>
                      <div className="text-sm text-gray-600">Browser and app notifications</div>
                    </div>
                    <button onClick={() => handleToggle('notifications', 'push')} className="relative">
                      <div className={`w-12 h-6 rounded-full transition ${settings.notifications.push ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications.push ? 'left-7' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Reminder Alerts</div>
                      <div className="text-sm text-gray-600">CDS meeting reminders</div>
                    </div>
                    <button onClick={() => handleToggle('notifications', 'reminders')} className="relative">
                      <div className={`w-12 h-6 rounded-full transition ${settings.notifications.reminders ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.notifications.reminders ? 'left-7' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-3">Notification Frequency</h4>
                <p className="text-blue-700 mb-4">
                  Customize how often you receive different types of notifications
                </p>
                <button className="px-6 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 font-medium">
                  Configure Frequency
                </button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Privacy Settings</h3>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Profile Visibility
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['public', 'private', 'contacts'].map(visibility => (
                        <button
                          key={visibility}
                          onClick={() => handleSelectChange('privacy', 'profileVisibility', visibility)}
                          className={`p-4 border-2 rounded-lg text-center capitalize ${
                            settings.privacy.profileVisibility === visibility
                              ? 'border-[#008753] bg-green-50'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          <div className="font-medium">{visibility}</div>
                          <div className="text-sm text-gray-600">
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
                        <div className="font-medium">Show Attendance to Others</div>
                        <div className="text-sm text-gray-600">Allow others to view your attendance record</div>
                      </div>
                      <button onClick={() => handleToggle('privacy', 'showAttendance')} className="relative">
                        <div className={`w-12 h-6 rounded-full transition ${settings.privacy.showAttendance ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.privacy.showAttendance ? 'left-7' : 'left-1'}`}></div>
                        </div>
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">Show Contact Information</div>
                        <div className="text-sm text-gray-600">Display phone and email to CDS members</div>
                      </div>
                      <button onClick={() => handleToggle('privacy', 'showContact')} className="relative">
                        <div className={`w-12 h-6 rounded-full transition ${settings.privacy.showContact ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.privacy.showContact ? 'left-7' : 'left-1'}`}></div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-red-800 mb-3">Data Privacy</h4>
                <p className="text-red-700 mb-4">
                  Your data is protected in accordance with our privacy policy. You can request data deletion at any time.
                </p>
                <div className="flex space-x-4">
                  <button className="px-6 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 font-medium">
                    Download My Data
                  </button>
                  <button className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 font-medium">
                    Request Deletion
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">Security Settings</h3>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Two-Factor Authentication</div>
                      <div className="text-sm text-gray-600">Add an extra layer of security</div>
                    </div>
                    <button onClick={() => handleToggle('security', 'twoFactor')} className="relative">
                      <div className={`w-12 h-6 rounded-full transition ${settings.security.twoFactor ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.security.twoFactor ? 'left-7' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Login Alerts</div>
                      <div className="text-sm text-gray-600">Notify you of new sign-ins</div>
                    </div>
                    <button onClick={() => handleToggle('security', 'loginAlerts')} className="relative">
                      <div className={`w-12 h-6 rounded-full transition ${settings.security.loginAlerts ? 'bg-[#008753]' : 'bg-gray-300'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${settings.security.loginAlerts ? 'left-7' : 'left-1'}`}></div>
                      </div>
                    </button>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Change Password</h4>
                    <button className="px-6 py-3 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] font-medium">
                      Update Password
                    </button>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Active Sessions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-600">Chrome • Lagos, Nigeria</div>
                        </div>
                        <button className="text-red-600 hover:text-red-800 text-sm font-medium">
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
              <h3 className="text-2xl font-bold text-gray-800">Account Settings</h3>
              
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-medium">Account Status</div>
                        <div className="text-green-600 font-semibold">Active</div>
                      </div>
                      <div>
                        <div className="font-medium">Member Since</div>
                        <div className="text-gray-600">March 2024</div>
                      </div>
                      <div>
                        <div className="font-medium">Account Type</div>
                        <div className="text-gray-600">Corps Member</div>
                      </div>
                      <div>
                        <div className="font-medium">CDS Group</div>
                        <div className="text-gray-600">{userData?.cdsGroup}</div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="text-lg font-semibold text-gray-800 mb-4">Account Actions</h4>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <div className="font-medium text-blue-600">Upgrade Account</div>
                        <div className="text-sm text-gray-600">Access premium features</div>
                      </button>
                      <button className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <div className="font-medium text-yellow-600">Export Account Data</div>
                        <div className="text-sm text-gray-600">Download all your information</div>
                      </button>
                      <button className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50">
                        <div className="font-medium text-red-600">Deactivate Account</div>
                        <div className="text-sm text-gray-600">Temporarily disable your account</div>
                      </button>
                      <button className="w-full text-left p-4 border border-red-300 rounded-lg hover:bg-red-50">
                        <div className="font-medium text-red-600">Delete Account</div>
                        <div className="text-sm text-gray-600">Permanently remove your account</div>
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