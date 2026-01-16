'use client';
import { useState } from 'react';

export default function DuesSection({ userData, darkMode }) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const duesData = {
    overview: [
      { month: 'January 2024', amount: 1000, status: 'Paid', date: '2024-01-15' },
      { month: 'February 2024', amount: 1000, status: 'Paid', date: '2024-02-12' },
      { month: 'March 2024', amount: 1000, status: 'Pending', date: 'Due: 2024-03-20' },
      { month: 'April 2024', amount: 1000, status: 'Upcoming', date: 'Due: 2024-04-15' },
    ],
    history: [
      { id: 1, month: 'December 2023', amount: 1000, status: 'Paid', date: '2023-12-10', method: 'Bank Transfer' },
      { id: 2, month: 'November 2023', amount: 1000, status: 'Paid', date: '2023-11-08', method: 'Cash' },
      { id: 3, month: 'October 2023', amount: 1000, status: 'Paid', date: '2023-10-12', method: 'Bank Transfer' },
    ],
    summary: {
      totalPaid: 3000,
      totalPending: 1000,
      totalUpcoming: 1000,
      balance: 2000
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold">₦{duesData.summary.totalPaid.toLocaleString()}</div>
          <div className="text-sm opacity-90">Total Paid</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white p-6 rounded-2xl">
          <div className="text-3xl mb-2">⏳</div>
          <div className="text-2xl font-bold">₦{duesData.summary.totalPending.toLocaleString()}</div>
          <div className="text-sm opacity-90">Pending</div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white p-6 rounded-2xl">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold">₦{duesData.summary.totalUpcoming.toLocaleString()}</div>
          <div className="text-sm opacity-90">Upcoming</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl">
          <div className="text-3xl mb-2">⚖️</div>
          <div className="text-2xl font-bold">₦{duesData.summary.balance.toLocaleString()}</div>
          <div className="text-sm opacity-90">Current Balance</div>
        </div>
      </div>

      <div className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex space-x-6">
          {['overview', 'history', 'payment'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-[#008753] text-[#008753]'
                  : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'}`
              }`}
            >
              {tab === 'overview' && 'Current Dues'}
              {tab === 'history' && 'Payment History'}
              {tab === 'payment' && 'Make Payment'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Month</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Status</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Action</th>
                </tr>
              </thead>
              <tbody className={darkMode ? 'divide-gray-700' : 'divide-gray-200'}>
                {duesData.overview.map((due, index) => (
                  <tr key={index} className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : ''}`}>{due.month}</td>
                    <td className={`py-4 px-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>₦{due.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        due.status === 'Paid' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        due.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {due.status}
                      </span>
                    </td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{due.date}</td>
                    <td className="py-4 px-4">
                      {due.status === 'Pending' && (
                        <button className="px-4 py-1 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] text-sm">
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
            <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>CDS Dues Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={darkMode ? 'text-blue-300' : 'text-blue-700'}>
                <div className="font-medium">Group: {userData?.cdsGroup}</div>
                <div className="text-sm">Monthly Dues: ₦1,000</div>
              </div>
              <div className={darkMode ? 'text-blue-300' : 'text-blue-700'}>
                <div className="font-medium">Treasurer: Mr. Adebayo</div>
                <div className="text-sm">Contact: 0803 XXX XXXX</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Month</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Amount</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Payment Date</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Method</th>
                  <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Receipt</th>
                </tr>
              </thead>
              <tbody className={darkMode ? 'divide-gray-700' : 'divide-gray-200'}>
                {duesData.history.map((payment) => (
                  <tr key={payment.id} className={darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-300' : ''}`}>{payment.month}</td>
                    <td className={`py-4 px-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>₦{payment.amount.toLocaleString()}</td>
                    <td className={`py-4 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{payment.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#008753] hover:text-[#006b42] dark:text-green-400 dark:hover:text-green-300 text-sm font-medium">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button className={`px-6 py-2 rounded-lg ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
              View All History
            </button>
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Payment Details</h4>
            <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex justify-between">
                <span>Pending Amount:</span>
                <span className="font-bold text-xl text-gray-800 dark:text-white">₦1,000</span>
              </div>
              <div className="flex justify-between">
                <span>Month:</span>
                <span className="font-medium text-gray-800 dark:text-white">March 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Due Date:</span>
                <span className="font-medium text-red-600 dark:text-red-400">2024-03-20</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Select Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className={`p-4 rounded-xl text-center border-2 ${darkMode ? 'border-gray-700 text-gray-300 hover:border-[#008753] hover:bg-green-900/30' : 'border-gray-300 hover:border-[#008753] hover:bg-green-50'}`}>
                <div className="text-3xl mb-2">🏦</div>
                <div className="font-medium">Bank Transfer</div>
              </button>
              <button className={`p-4 rounded-xl text-center border-2 ${darkMode ? 'border-gray-700 text-gray-300 hover:border-[#008753] hover:bg-green-900/30' : 'border-gray-300 hover:border-[#008753] hover:bg-green-50'}`}>
                <div className="text-3xl mb-2">💳</div>
                <div className="font-medium">Card Payment</div>
              </button>
              <button className={`p-4 rounded-xl text-center border-2 ${darkMode ? 'border-gray-700 text-gray-300 hover:border-[#008753] hover:bg-green-900/30' : 'border-gray-300 hover:border-[#008753] hover:bg-green-50'}`}>
                <div className="text-3xl mb-2">📱</div>
                <div className="font-medium">USSD</div>
              </button>
            </div>
          </div>

          <button className="w-full bg-[#008753] text-white py-4 rounded-xl hover:bg-[#006b42] transition font-bold text-lg">
            Proceed to Pay ₦1,000
          </button>

          <div className={`text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            By proceeding, you agree to our payment terms and conditions
          </div>
        </div>
      )}
    </div>
  );
}