'use client';
import { useState } from 'react';

export default function OverviewSection({ userData, darkMode }) {
  const [stats] = useState([
    { label: 'Total CDS Days', value: '48', change: '+5%', icon: '📅', color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { label: 'Attendance Rate', value: '90%', change: '+3%', icon: '📊', color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { label: 'Days Present', value: '43', change: '+3', icon: '✅', color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { label: 'Days Absent', value: '5', change: '-2', icon: '❌', color: 'bg-gradient-to-r from-red-500 to-orange-500' },
    { label: 'Wallet Balance', value: '₦4,500', change: '+₦300', icon: '💰', color: 'bg-gradient-to-r from-yellow-500 to-amber-500' },
    { label: 'Market Items', value: '2', change: '+1', icon: '🛍️', color: 'bg-gradient-to-r from-pink-500 to-rose-500' }
  ]);

  const [recentActivities] = useState([
    { date: 'Today', activity: 'Attendance marked at Lokoja Secretariat', status: 'Present', type: 'attendance' },
    { date: 'Yesterday', activity: 'Sold farm produce on Marketplace', status: 'Sold', type: 'marketplace' },
    { date: '2 days ago', activity: 'Updated Kogi profile information', status: 'Updated', type: 'profile' },
    { date: '1 week ago', activity: 'Downloaded Kogi attendance report', status: 'Downloaded', type: 'reports' },
    { date: '1 week ago', activity: 'Bought textbooks on Marketplace', status: 'Purchased', type: 'marketplace' }
  ]);

  const [quickActions] = useState([
    { title: 'Mark Attendance', description: 'Mark today\'s CDS attendance', icon: '📝', color: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' },
    { title: 'Browse Marketplace', description: 'View Kogi corpers market', icon: '🛍️', color: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' },
    { title: 'Pay CDS Dues', description: 'Make Kogi dues payment', icon: '💰', color: 'bg-gradient-to-r from-yellow-500 to-amber-500 text-white' },
    { title: 'View Schedule', description: 'Check Kogi CDS schedule', icon: '📅', color: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' }
  ]);

  const [kogiLGAs] = useState([
    { lga: 'Lokoja', corpers: 65, status: 'High Activity' },
    { lga: 'Okene', corpers: 42, status: 'Active' },
    { lga: 'Kabba', corpers: 38, status: 'Active' },
    { lga: 'Idah', corpers: 35, status: 'Moderate' },
    { lga: 'Ankpa', corpers: 40, status: 'Active' },
    { lga: 'Koton-Karfe', corpers: 32, status: 'Moderate' }
  ]);

  const handleQuickAction = (action) => {
    alert(`Initiating: ${action.title} for Kogi`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'} hover:shadow-md transition-all duration-300`}>
            <div className="flex items-center justify-between mb-3">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center text-white text-lg`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">{stat.value}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Kogi Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                  className={`p-4 rounded-lg hover:opacity-90 transition text-left ${action.color}`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-xl mr-3">{action.icon}</span>
                    <div className="font-bold">{action.title}</div>
                  </div>
                  <div className="text-xs opacity-90">{action.description}</div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Kogi Service Status</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                  <div className="text-xs text-[#FF8C00] dark:text-amber-300">Your LGA</div>
                  <div className="font-bold text-[#008753] dark:text-green-400">{userData?.lga || 'Lokoja'}</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <div className="text-xs text-green-700 dark:text-green-300">NYSC Weeks</div>
                  <div className="font-bold text-green-800 dark:text-green-200">14 weeks</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <div className="text-xs text-purple-700 dark:text-purple-300">Remaining</div>
                  <div className="font-bold text-purple-800 dark:text-purple-200">18 weeks</div>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-lg">
                  <div className="text-xs text-yellow-700 dark:text-yellow-300">Next Kogi CDS</div>
                  <div className="font-bold text-yellow-800 dark:text-yellow-200">Mar 16</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Activities</h3>
            <span className="text-xs px-2 py-1 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/30 text-[#FF8C00] dark:text-amber-300 rounded-full">
              {userData?.lga || 'Lokoja'} LGA
            </span>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-start p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                  activity.type === 'attendance' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                  activity.type === 'marketplace' ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' :
                  activity.type === 'profile' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                  'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                }`}>
                  {activity.type === 'attendance' ? '📝' :
                   activity.type === 'marketplace' ? '🛍️' :
                   activity.type === 'profile' ? '👤' : '📈'}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-800 dark:text-white text-sm">{activity.activity}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{activity.date}</div>
                  <div className="mt-1">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                      activity.status === 'Present' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      activity.status === 'Sold' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                      activity.status === 'Updated' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                      activity.status === 'Downloaded' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-400'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-center text-sm text-[#008753] dark:text-green-400 hover:underline">
            View All Kogi Activities →
          </button>
        </div>
      </div>

      <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-[#008753] via-[#FFA500] to-[#008753] text-white'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                🏞️
              </div>
              <h3 className="text-xl font-bold">Welcome to Kogi, {userData?.firstName}!</h3>
            </div>
            <p className="opacity-90">
              Serving in <span className="font-bold">Confluence State</span> | 
              LGA: <span className="font-bold">{userData?.lga || 'Lokoja'}</span> | 
              Zone: <span className="font-bold">{userData?.cdsZone || '3'}</span>
            </p>
            <p className="opacity-90 mt-1">
              CDS Group: <span className="font-bold">{userData?.cdsGroup}</span> at <span className="font-bold">{userData?.cdsLocation || 'Lokoja Secretariat'}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button className="bg-white text-[#008753] px-4 py-2 rounded-lg hover:bg-gray-100 transition font-bold text-sm">
              Kogi Marketplace
            </button>
            <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition font-medium text-sm">
              Kogi Schedule
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">14</div>
            <div className="text-sm opacity-90">Weeks in Kogi</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">18</div>
            <div className="text-sm opacity-90">Weeks Remaining</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">90%</div>
            <div className="text-sm opacity-90">Kogi Attendance</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">A</div>
            <div className="text-sm opacity-90">Kogi Performance</div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Kogi LGAs Overview</h3>
          <span className="text-xs font-medium text-[#008753] dark:text-green-400">Total: 252 Corpers</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {kogiLGAs.map((lga, index) => (
            <div key={index} className={`p-3 rounded-lg text-center ${lga.lga === (userData?.lga || 'Lokoja') ? 'bg-gradient-to-r from-[#008753] to-[#FFA500] text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="text-lg font-bold">{lga.lga}</div>
              <div className="text-xs opacity-90">{lga.corpers} corpers</div>
              <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                lga.status === 'High Activity' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                lga.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
              }`}>
                {lga.status}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">48</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Kogi Days</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 5%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">43</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Present</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 3</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Absent</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↓ 2</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₦4,500</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Wallet</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ ₦300</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">2</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Listings</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}