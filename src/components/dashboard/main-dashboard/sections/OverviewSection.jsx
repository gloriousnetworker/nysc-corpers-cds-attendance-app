'use client';
import { useState } from 'react';

export default function OverviewSection({ userData, darkMode }) {
  const [stats] = useState([
    { label: 'Total CDS Days', value: '48', change: '+5%', icon: '📅', color: 'bg-blue-500' },
    { label: 'Attendance Rate', value: '85%', change: '+2%', icon: '📊', color: 'bg-green-500' },
    { label: 'Days Present', value: '41', change: '+3', icon: '✅', color: 'bg-purple-500' },
    { label: 'Days Absent', value: '7', change: '-2', icon: '❌', color: 'bg-red-500' },
    { label: 'Wallet Balance', value: '₦5,250', change: '+₦500', icon: '💰', color: 'bg-yellow-500' },
    { label: 'Market Items', value: '3', change: '+1', icon: '🛍️', color: 'bg-pink-500' }
  ]);

  const [recentActivities] = useState([
    { date: 'Today', activity: 'Attendance marked for CDS meeting', status: 'Present', type: 'attendance' },
    { date: 'Yesterday', activity: 'Sold iPhone on Marketplace', status: 'Sold', type: 'marketplace' },
    { date: '2 days ago', activity: 'Updated profile information', status: 'Updated', type: 'profile' },
    { date: '1 week ago', activity: 'Downloaded attendance report', status: 'Downloaded', type: 'reports' },
    { date: '1 week ago', activity: 'Bought textbooks on Marketplace', status: 'Purchased', type: 'marketplace' }
  ]);

  const [quickActions] = useState([
    { title: 'Mark Attendance', description: 'Mark today\'s CDS attendance', icon: '📝', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' },
    { title: 'Browse Marketplace', description: 'View items for sale', icon: '🛍️', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' },
    { title: 'Pay CDS Dues', description: 'Make dues payment', icon: '💰', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' },
    { title: 'View Schedule', description: 'Check CDS schedule', icon: '📅', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' }
  ]);

  const handleQuickAction = (action) => {
    alert(`Initiating: ${action.title}`);
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
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
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
                  <div className={`text-xs ${darkMode ? 'opacity-80' : 'opacity-90'}`}>{action.description}</div>
                </button>
              ))}
            </div>
            
            <div className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Service Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>NYSC Weeks Completed</span>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">8 weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remaining Service</span>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">24 weeks</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Next CDS Meeting</span>
                  <span className="text-xs font-medium text-purple-600 dark:text-purple-400">Wed, Mar 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className={`flex items-start p-3 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} transition`}>
                <div className={`w-8 h-8 rounded-full mr-3 flex items-center justify-center ${
                  activity.type === 'attendance' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                  activity.type === 'marketplace' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' :
                  activity.type === 'profile' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400' :
                  'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
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
            View All Activities →
          </button>
        </div>
      </div>

      <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-[#008753] to-[#00a86b] text-white'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Welcome, {userData?.firstName}!</h3>
            <p className="opacity-90">
              You're currently serving in <span className="font-bold">{userData?.servingState}</span> State 
              with <span className="font-bold">{userData?.cdsGroup}</span> CDS group.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <button className="bg-white text-[#008753] px-4 py-2 rounded-lg hover:bg-gray-100 transition font-bold text-sm">
              View Marketplace
            </button>
            <button className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition font-medium text-sm">
              Check Schedule
            </button>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">8</div>
            <div className="text-sm opacity-90">Weeks Completed</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">24</div>
            <div className="text-sm opacity-90">Weeks Remaining</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">85%</div>
            <div className="text-sm opacity-90">Attendance Rate</div>
          </div>
          <div className="text-center p-4 bg-white/10 rounded-lg">
            <div className="text-lg font-bold">A</div>
            <div className="text-sm opacity-90">Performance Grade</div>
          </div>
        </div>
      </div>

      <div className={`rounded-xl p-5 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">CDS Performance Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">48</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Days</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 5%</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">41</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Present</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 3</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Absent</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↓ 2</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₦5,250</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Wallet</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ ₦500</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">3</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Listings</div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">↑ 1</div>
          </div>
        </div>
      </div>
    </div>
  );
}