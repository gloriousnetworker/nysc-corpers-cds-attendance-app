'use client';
import { useState } from 'react';

export default function AttendanceSection({ userData }) {
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
          <h2 className="text-2xl font-bold text-gray-800">Monthly Attendance Calendar</h2>
          <p className="text-gray-600">Track your CDS attendance for {months[currentMonth]} {currentYear}</p>
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
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            ←
          </button>
          <span className="font-semibold text-lg">
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
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => (
          <div key={index} className={`min-h-24 p-2 border rounded-lg ${
            day ? (day.isToday ? 'border-[#008753] border-2' : 'border-gray-200') : ''
          }`}>
            {day && (
              <>
                <div className="text-right font-medium mb-1">{day.day}</div>
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

      <div className="flex items-center justify-center space-x-6 mt-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="text-sm">Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className="text-sm">Late</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className="text-sm">Absent</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
          <span className="text-sm">Weekend</span>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Mark Today's Attendance</h3>
            <p className="text-gray-600">Click below to mark your attendance for today</p>
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
        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <h4 className="font-bold text-gray-800 mb-2">Attendance Summary</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Total Days:</span>
              <span className="font-bold">48</span>
            </div>
            <div className="flex justify-between">
              <span>Days Present:</span>
              <span className="font-bold text-green-600">41</span>
            </div>
            <div className="flex justify-between">
              <span>Days Absent:</span>
              <span className="font-bold text-red-600">7</span>
            </div>
            <div className="flex justify-between">
              <span>Attendance Rate:</span>
              <span className="font-bold">85%</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <h4 className="font-bold text-gray-800 mb-2">Recent Attendance</h4>
          <div className="space-y-3">
            {['Today', 'Yesterday', '2 days ago', '1 week ago'].map((day, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{day}</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Present
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl">
          <h4 className="font-bold text-gray-800 mb-2">Download Reports</h4>
          <div className="space-y-3">
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border">
              📄 Monthly Report (PDF)
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border">
              📊 Quarterly Analytics
            </button>
            <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border">
              🎯 Performance Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}