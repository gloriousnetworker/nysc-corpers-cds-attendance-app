'use client';
import { useState } from 'react';

export default function ScheduleSection({ userData, darkMode }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const scheduleData = [
    {
      date: '2024-03-15',
      day: 'Friday',
      events: [
        { time: '10:00 AM', title: 'CDS General Meeting', location: 'LGA Secretariat', type: 'mandatory' },
        { time: '2:00 PM', title: 'Community Cleanup', location: 'Main Market', type: 'activity' }
      ]
    },
    {
      date: '2024-03-22',
      day: 'Friday',
      events: [
        { time: '10:00 AM', title: 'Health Awareness Campaign', location: 'Health Center', type: 'mandatory' }
      ]
    },
    {
      date: '2024-03-29',
      day: 'Friday',
      events: [
        { time: '10:00 AM', title: 'CDS General Meeting', location: 'LGA Secretariat', type: 'mandatory' },
        { time: '12:00 PM', title: 'Skills Training', location: 'Vocational Center', type: 'workshop' }
      ]
    },
    {
      date: '2024-04-05',
      day: 'Friday',
      events: [
        { time: '9:00 AM', title: 'Sports Competition', location: 'Stadium', type: 'activity' }
      ]
    }
  ];

  const upcomingEvents = [
    { date: 'Tomorrow', title: 'Group Meeting', time: '2:00 PM', priority: 'high' },
    { date: 'Next Week', title: 'Community Service', time: '9:00 AM', priority: 'medium' },
    { date: 'April 12', title: 'Monthly Evaluation', time: '11:00 AM', priority: 'high' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>CDS Schedule Calendar</h2>
          
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>March 2024 Schedule</h3>
              <div className="flex space-x-2">
                <button className={`px-4 py-2 rounded-lg ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                  ← Previous
                </button>
                <button className={`px-4 py-2 rounded-lg ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-50'}`}>
                  Next →
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
              {Array.from({ length: 31 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-20 p-2 rounded-lg ${
                    index + 1 === 15 || index + 1 === 22 || index + 1 === 29
                      ? 'border-2 border-[#008753] bg-green-100 dark:bg-green-900/30'
                      : `${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
                  }`}
                >
                  <div className={`text-right font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{index + 1}</div>
                  {[15, 22, 29].includes(index + 1) && (
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">CDS Day</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {scheduleData.map((daySchedule, index) => (
              <div key={index} className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{daySchedule.day}, {daySchedule.date}</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{daySchedule.events.length} scheduled events</p>
                  </div>
                  <button className="px-4 py-2 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] text-sm">
                    Set Reminder
                  </button>
                </div>
                
                <div className="space-y-4">
                  {daySchedule.events.map((event, eventIndex) => (
                    <div key={eventIndex} className={`flex items-start p-4 rounded-lg ${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <div className="mr-4">
                        <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>{event.title}</div>
                        <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{event.location}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        event.type === 'mandatory' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                        event.type === 'workshop' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {event.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#008753] to-[#00a86b] text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold">{event.title}</div>
                      <div className="text-sm opacity-90">{event.date} • {event.time}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.priority === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      {event.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-white text-[#008753] py-2 rounded-lg hover:bg-gray-100 font-medium">
              View All Events
            </button>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Schedule Information</h3>
            <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Mandatory Attendance</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Optional Activities</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>Workshops/Training</span>
              </div>
            </div>
            
            <div className={`mt-6 pt-6 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h4 className={`font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>CDS Coordinator</h4>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <div>Mr. Adeyemi Johnson</div>
                <div>Phone: 0803 XXX XXXX</div>
                <div>Email: coordinator@nysc.gov.ng</div>
              </div>
            </div>
          </div>

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>📅 Add to Calendar</h3>
            <div className="space-y-3">
              <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/40' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-100'}`}>
                <div className="font-medium">Google Calendar</div>
                <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Add all events</div>
              </button>
              <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/40' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-100'}`}>
                <div className="font-medium">Outlook Calendar</div>
                <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Sync schedule</div>
              </button>
              <button className={`w-full text-left p-3 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800 text-blue-300 hover:bg-blue-900/40' : 'bg-white border-blue-200 text-blue-800 hover:bg-blue-100'}`}>
                <div className="font-medium">Apple Calendar</div>
                <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>Import events</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}