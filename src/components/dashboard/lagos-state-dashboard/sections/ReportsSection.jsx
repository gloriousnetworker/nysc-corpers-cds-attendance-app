'use client';
import { useState } from 'react';

export default function ReportsSection({ userData, darkMode }) {
  const [reportType, setReportType] = useState('attendance');
  const [dateRange, setDateRange] = useState('monthly');

  const attendanceStats = {
    monthly: { present: 41, absent: 7, late: 0, total: 48, rate: '85%' },
    quarterly: { present: 120, absent: 15, late: 5, total: 140, rate: '86%' },
    yearly: { present: 180, absent: 20, late: 10, total: 210, rate: '86%' }
  };

  const reports = [
    { id: 1, title: 'Monthly Attendance Report', type: 'attendance', date: 'March 2024', format: 'PDF', size: '2.4 MB' },
    { id: 2, title: 'Quarterly Performance Report', type: 'performance', date: 'Q1 2024', format: 'PDF', size: '3.1 MB' },
    { id: 3, title: 'CDS Participation Summary', type: 'participation', date: '2024', format: 'Excel', size: '1.8 MB' },
    { id: 4, title: 'Attendance Certificate', type: 'certificate', date: 'March 15, 2024', format: 'PDF', size: '1.2 MB' }
  ];

  const generateReport = () => {
    alert(`Generating ${reportType} report for ${dateRange}...`);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Generate New Report</h3>
            
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Report Type
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {['attendance', 'performance', 'certificate'].map(type => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      className={`p-4 rounded-xl text-center border-2 transition ${
                        reportType === type
                          ? 'border-[#008753] bg-green-100 dark:bg-green-900/30'
                          : `${darkMode ? 'border-gray-700 hover:border-gray-600' : 'border-gray-300 hover:border-gray-400'}`
                      }`}
                    >
                      <div className="text-2xl mb-2">
                        {type === 'attendance' && '📊'}
                        {type === 'performance' && '📈'}
                        {type === 'certificate' && '🏆'}
                      </div>
                      <div className={`font-medium capitalize ${darkMode ? 'text-gray-300' : ''}`}>{type} Report</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date Range
                </label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {['weekly', 'monthly', 'quarterly', 'yearly'].map(range => (
                    <button
                      key={range}
                      onClick={() => setDateRange(range)}
                      className={`py-3 rounded-lg text-center font-medium ${
                        dateRange === range
                          ? 'bg-[#008753] text-white'
                          : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                      }`}
                    >
                      {range.charAt(0).toUpperCase() + range.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h4 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Report Preview</h4>
                <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex justify-between">
                    <span>Report Type:</span>
                    <span className="font-medium capitalize text-gray-800 dark:text-white">{reportType} Report</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Period:</span>
                    <span className="font-medium capitalize text-gray-800 dark:text-white">{dateRange} (March 2024)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Format:</span>
                    <span className="font-medium text-gray-800 dark:text-white">PDF Document</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Size:</span>
                    <span className="font-medium text-gray-800 dark:text-white">2-3 MB</span>
                  </div>
                </div>
              </div>

              <button
                onClick={generateReport}
                className="w-full bg-[#008753] text-white py-4 rounded-xl hover:bg-[#006b42] transition font-bold text-lg"
              >
                Generate Report
              </button>
            </div>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Report History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                    <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Report Title</th>
                    <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Type</th>
                    <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date</th>
                    <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Format</th>
                    <th className={`py-3 px-4 text-left font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Action</th>
                  </tr>
                </thead>
                <tbody className={darkMode ? 'divide-gray-700' : 'divide-gray-200'}>
                  {reports.map(report => (
                    <tr key={report.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                      <td className={`py-4 px-4 font-medium ${darkMode ? 'text-gray-300' : ''}`}>{report.title}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                          {report.type}
                        </span>
                      </td>
                      <td className={`py-4 px-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{report.date}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'}`}>
                          {report.format}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] text-sm">
                            Download
                          </button>
                          <button className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Statistics Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">{attendanceStats[dateRange].rate}</div>
                  <div className="text-sm opacity-90">Attendance Rate</div>
                </div>
                <div className="text-3xl">📊</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <div className="font-bold">{attendanceStats[dateRange].present}</div>
                  <div className="text-sm opacity-90">Present</div>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <div className="font-bold">{attendanceStats[dateRange].absent}</div>
                  <div className="text-sm opacity-90">Absent</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Quick Stats</h3>
            <div className="space-y-4">
              <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Reports Generated</div>
                <div className="text-xl font-bold text-[#008753] dark:text-green-400">12</div>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>This Month</div>
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">3</div>
              </div>
              <div className={`flex justify-between items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Storage Used</div>
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">24 MB</div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>Export Options</h3>
            <div className="space-y-3">
              <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/40' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-100'}`}>
                <div className="font-medium">📄 PDF Format</div>
                <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>High quality print version</div>
              </button>
              <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/40' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-100'}`}>
                <div className="font-medium">📊 Excel Spreadsheet</div>
                <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Data analysis ready</div>
              </button>
              <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/40' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-100'}`}>
                <div className="font-medium">📈 CSV Data</div>
                <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Raw data export</div>
              </button>
            </div>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Need Help?</h3>
            <p className={`mb-4 ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
              Having trouble generating reports? Contact support for assistance.
            </p>
            <button className={`w-full py-2 rounded-lg font-medium ${darkMode ? 'bg-green-900/30 text-green-400 hover:bg-green-900/50' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}