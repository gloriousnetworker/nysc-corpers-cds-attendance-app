'use client';

export default function AccountSettings({ darkMode, userData }) {
  return (
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
                <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{userData?.cdsGroup || 'Not assigned'}</div>
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
  );
}