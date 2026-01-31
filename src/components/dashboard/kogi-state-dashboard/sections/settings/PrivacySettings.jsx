'use client';
import { useState, useEffect } from 'react';

export default function PrivacySettings({ darkMode }) {
  const [settings, setSettings] = useState({
    privacy: {
      profileVisibility: 'public',
      showAttendance: true,
      showContact: false
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
      privacy: {
        ...settings.privacy,
        [key]: !settings.privacy[key]
      }
    };
    saveSettings(updatedSettings);
  };

  const handleSelectChange = (key, value) => {
    const updatedSettings = {
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value
      }
    };
    saveSettings(updatedSettings);
  };

  return (
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
                  onClick={() => handleSelectChange('profileVisibility', visibility)}
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
                onClick={() => handleToggle('showAttendance')} 
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
                onClick={() => handleToggle('showContact')} 
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
  );
}