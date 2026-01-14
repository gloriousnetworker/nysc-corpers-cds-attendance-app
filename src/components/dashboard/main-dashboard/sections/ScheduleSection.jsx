'use client';
import { useState } from 'react';

export default function ScheduleSection({ userData }) {
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
          <h2 className="text-2xl font-bold text-gray-800">CDS Schedule Calendar</h2>
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">March 2024 Schedule</h3>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  ← Previous
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Next →
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
              {Array.from({ length: 31 }).map((_, index) => (
                <div
                  key={index}
                  className={`min-h-20 p-2 border rounded-lg ${
                    index + 1 === 15 || index + 1 === 22 || index + 1 === 29
                      ? 'border-[#008753] border-2 bg-green-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="text-right font-medium">{index + 1}</div>
                  {[15, 22, 29].includes(index + 1) && (
                    <div className="text-xs text-green-600 font-medium">CDS Day</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {scheduleData.map((daySchedule, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{daySchedule.day}, {daySchedule.date}</h4>
                    <p className="text-gray-600">{daySchedule.events.length} scheduled events</p>
                  </div>
                  <button className="px-4 py-2 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] text-sm">
                    Set Reminder
                  </button>
                </div>
                
                <div className="space-y-4">
                  {daySchedule.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="mr-4">
                        <div className="font-bold text-gray-800">{event.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{event.title}</div>
                        <div className="text-gray-600 text-sm">{event.location}</div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs ${
                        event.type === 'mandatory' ? 'bg-red-100 text-red-800' :
                        event.type === 'workshop' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
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

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Schedule Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Mandatory Attendance</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Optional Activities</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Workshops/Training</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-800 mb-2">CDS Coordinator</h4>
              <div className="text-gray-600 text-sm">
                <div>Mr. Adeyemi Johnson</div>
                <div>Phone: 0803 XXX XXXX</div>
                <div>Email: coordinator@nysc.gov.ng</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">📅 Add to Calendar</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-100">
                <div className="font-medium text-blue-800">Google Calendar</div>
                <div className="text-sm text-blue-600">Add all events</div>
              </button>
              <button className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-100">
                <div className="font-medium text-blue-800">Outlook Calendar</div>
                <div className="text-sm text-blue-600">Sync schedule</div>
              </button>
              <button className="w-full text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-100">
                <div className="font-medium text-blue-800">Apple Calendar</div>
                <div className="text-sm text-blue-600">Import events</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}