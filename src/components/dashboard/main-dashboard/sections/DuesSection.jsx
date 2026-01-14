'use client';
import { useState } from 'react';

export default function DuesSection({ userData }) {
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

      <div className="border-b border-gray-200">
        <div className="flex space-x-6">
          {['overview', 'history', 'payment'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 font-medium ${
                activeTab === tab
                  ? 'border-b-2 border-[#008753] text-[#008753]'
                  : 'text-gray-600 hover:text-gray-900'
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
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Month</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Amount</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Date</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {duesData.overview.map((due, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4">{due.month}</td>
                    <td className="py-4 px-4 font-medium">₦{due.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        due.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        due.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {due.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{due.date}</td>
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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-blue-800 mb-3">CDS Dues Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
              <div>
                <div className="font-medium">Group: {userData?.cdsGroup}</div>
                <div className="text-sm">Monthly Dues: ₦1,000</div>
              </div>
              <div>
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
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Month</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Amount</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Payment Date</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Method</th>
                  <th className="py-3 px-4 text-left text-gray-600 font-semibold">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {duesData.history.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">{payment.month}</td>
                    <td className="py-4 px-4 font-medium">₦{payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-4">{payment.date}</td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                        {payment.method}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-[#008753] hover:text-[#006b42] text-sm font-medium">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              View All History
            </button>
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Payment Details</h4>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Amount:</span>
                <span className="font-bold text-xl">₦1,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Month:</span>
                <span className="font-medium">March 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Due Date:</span>
                <span className="font-medium text-red-600">2024-03-20</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-800">Select Payment Method</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border-2 border-gray-300 rounded-xl hover:border-[#008753] hover:bg-green-50 transition text-center">
                <div className="text-3xl mb-2">🏦</div>
                <div className="font-medium">Bank Transfer</div>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-xl hover:border-[#008753] hover:bg-green-50 transition text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="font-medium">Card Payment</div>
              </button>
              <button className="p-4 border-2 border-gray-300 rounded-xl hover:border-[#008753] hover:bg-green-50 transition text-center">
                <div className="text-3xl mb-2">📱</div>
                <div className="font-medium">USSD</div>
              </button>
            </div>
          </div>

          <button className="w-full bg-[#008753] text-white py-4 rounded-xl hover:bg-[#006b42] transition font-bold text-lg">
            Proceed to Pay ₦1,000
          </button>

          <div className="text-center text-gray-600 text-sm">
            By proceeding, you agree to our payment terms and conditions
          </div>
        </div>
      )}
    </div>
  );
}