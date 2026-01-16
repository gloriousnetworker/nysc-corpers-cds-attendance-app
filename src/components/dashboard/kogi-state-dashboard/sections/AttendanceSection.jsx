'use client';
import { useState } from 'react';

export default function AttendanceSection({ userData, darkMode }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isToday = i === new Date().getDate() && currentMonth === new Date().getMonth();
      
      let status = 'absent';
      if (i <= new Date().getDate()) {
        status = Math.random() > 0.2 ? 'present' : 'late';
      }
      
      days.push({
        day: i,
        date,
        isWeekend,
        isToday,
        status
      });
    }
    
    return days;
  };

  const handleMarkAttendance = () => {
    alert('Attendance marked successfully!');
  };

  const calendarDays = generateCalendar();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Monthly Attendance Calendar</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Track your CDS attendance for {months[currentMonth]} {currentYear}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              if (currentMonth > 0) {
                setCurrentMonth(currentMonth - 1);
              } else {
                setCurrentMonth(11);
                setCurrentYear(currentYear - 1);
              }
            }}
            className={`p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            ←
          </button>
          <span className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {months[currentMonth]} {currentYear}
          </span>
          <button
            onClick={() => {
              if (currentMonth < 11) {
                setCurrentMonth(currentMonth + 1);
              } else {
                setCurrentMonth(0);
                setCurrentYear(currentYear + 1);
              }
            }}
            className={`p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:bg-gray-800' : 'hover:bg-gray-100'}`}
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className={`text-center font-semibold py-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className={`min-h-24 p-2 rounded-lg ${
            day ? (day.isToday ? 'border-2 border-[#008753]' : `${darkMode ? 'bg-gray-800' : 'bg-white'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`) : ''
          }`}>
            {day && (
              <>
                <div className={`text-right font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{day.day}</div>
                <div className="flex justify-center">
                  {!day.isWeekend && (
                    <div className={`w-3 h-3 rounded-full ${
                      day.status === 'present' ? 'bg-green-500' :
                      day.status === 'late' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}></div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Late</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Absent</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Weekend</span>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mark Today's Attendance</h3>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Click below to mark your attendance for today</p>
          </div>
          <button
            onClick={handleMarkAttendance}
            className="bg-[#008753] text-white px-8 py-3 rounded-lg hover:bg-[#006b42] transition font-bold"
          >
            Mark Attendance
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Attendance Summary</h4>
          <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex justify-between">
              <span>Total Days:</span>
              <span className="font-bold text-gray-800 dark:text-white">48</span>
            </div>
            <div className="flex justify-between">
              <span>Days Present:</span>
              <span className="font-bold text-green-600 dark:text-green-400">41</span>
            </div>
            <div className="flex justify-between">
              <span>Days Absent:</span>
              <span className="font-bold text-red-600 dark:text-red-400">7</span>
            </div>
            <div className="flex justify-between">
              <span>Attendance Rate:</span>
              <span className="font-bold text-gray-800 dark:text-white">85%</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Attendance</h4>
          <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {['Today', 'Yesterday', '2 days ago', '1 week ago'].map((day, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{day}</span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-sm rounded-full">
                  Present
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h4 className={`font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Download Reports</h4>
          <div className="space-y-3">
            <button className={`w-full text-left p-3 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              📄 Monthly Report (PDF)
            </button>
            <button className={`w-full text-left p-3 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              📊 Quarterly Analytics
            </button>
            <button className={`w-full text-left p-3 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
              🎯 Performance Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}