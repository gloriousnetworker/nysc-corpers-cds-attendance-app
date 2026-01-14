export default function OverviewSection({ userData }) {
    const stats = [
      { label: 'Total CDS Days', value: '48', change: '+5%', icon: '📅' },
      { label: 'Attendance Rate', value: '85%', change: '+2%', icon: '📊' },
      { label: 'Days Present', value: '41', change: '+3', icon: '✅' },
      { label: 'Days Absent', value: '7', change: '-2', icon: '❌' }
    ];
  
    const recentActivities = [
      { date: 'Today', activity: 'Attendance marked for CDS meeting', status: 'Present' },
      { date: 'Yesterday', activity: 'Paid CDS dues for March', status: 'Paid' },
      { date: '2 days ago', activity: 'Updated profile information', status: 'Updated' },
      { date: '1 week ago', activity: 'Downloaded attendance report', status: 'Downloaded' }
    ];
  
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#008753] to-[#00a86b] text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-white text-[#008753] py-3 rounded-lg hover:bg-gray-100 transition font-bold">
                Mark Today's Attendance
              </button>
              <button className="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition font-medium">
                View CDS Schedule
              </button>
              <button className="w-full bg-white/20 text-white py-3 rounded-lg hover:bg-white/30 transition font-medium">
                Generate Monthly Report
              </button>
            </div>
          </div>
  
          <div className="bg-white border border-gray-200 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-[#008753] rounded-full mr-3"></div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.activity}</div>
                    <div className="text-sm text-gray-500">{activity.date}</div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Welcome, {userData?.firstName}!</h3>
          <p className="text-gray-600 mb-4">
            You're currently serving in <span className="font-bold">{userData?.servingState}</span> State 
            with <span className="font-bold">{userData?.cdsGroup}</span> CDS group.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-[#008753]">8</div>
              <div className="text-gray-600">Weeks Completed</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-[#008753]">24</div>
              <div className="text-gray-600">Weeks Remaining</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-[#008753]">85%</div>
              <div className="text-gray-600">Attendance Rate</div>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <div className="text-2xl font-bold text-[#008753]">A</div>
              <div className="text-gray-600">Performance Grade</div>
            </div>
          </div>
        </div>
      </div>
    );
  }