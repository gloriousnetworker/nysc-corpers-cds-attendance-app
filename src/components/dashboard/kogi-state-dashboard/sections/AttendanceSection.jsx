'use client';
import { useState, useEffect } from 'react';

export default function CorperAttendance({ userData, darkMode }) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState({});
  const [todayStatus, setTodayStatus] = useState('not_marked');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioEvidence, setAudioEvidence] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const corperData = {
    name: 'John Doe',
    stateCode: 'NYSC/KG/2024/001',
    cdsGroup: 'ICT & Digital Skills',
    coordinator: 'Coordinator Name'
  };

  useEffect(() => {
    loadAttendanceData();
    checkTodayStatus();
  }, [currentMonth, currentYear]);

  const loadAttendanceData = () => {
    const key = `attendance_${corperData.stateCode}_${currentYear}_${currentMonth}`;
    const stored = localStorage.getItem(key);
    if (stored) {
      setAttendanceData(JSON.parse(stored));
    }
  };

  const checkTodayStatus = () => {
    const today = new Date().toDateString();
    const status = attendanceData[today] || 'not_marked';
    setTodayStatus(status);
  };

  const generateCalendar = () => {
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const dateString = date.toDateString();
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isToday = i === new Date().getDate() && currentMonth === new Date().getMonth();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      
      let status = 'absent';
      if (attendanceData[dateString]) {
        status = attendanceData[dateString];
      } else if (isWeekend) {
        status = 'weekend';
      } else if (!isPast) {
        status = 'future';
      }
      
      days.push({
        day: i,
        date: dateString,
        isWeekend,
        isToday,
        status
      });
    }
    
    return days;
  };

  const handleManualAttendance = () => {
    setShowCodeInput(true);
  };

  const verifyCodeAndMark = () => {
    if (!codeInput.trim()) {
      alert('Please enter the daily code');
      return;
    }

    const storedCode = localStorage.getItem('daily_attendance_code');
    if (codeInput.toUpperCase() === storedCode) {
      const today = new Date().toDateString();
      const newData = {
        ...attendanceData,
        [today]: 'present',
        [`${today}_method`]: 'code_verified',
        [`${today}_time`]: new Date().toLocaleTimeString()
      };
      
      const key = `attendance_${corperData.stateCode}_${currentYear}_${currentMonth}`;
      localStorage.setItem(key, JSON.stringify(newData));
      setAttendanceData(newData);
      setTodayStatus('present');
      setShowCodeInput(false);
      setCodeInput('');
      alert('Attendance marked successfully via code verification!');
    } else {
      alert('Invalid code. Please get the correct code from your coordinator.');
    }
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      
      const audioChunks = [];
      recorder.ondataavailable = event => audioChunks.push(event.data);
      
      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioEvidence(audioUrl);
        
        const today = new Date().toDateString();
        const newData = {
          ...attendanceData,
          [today]: 'present',
          [`${today}_method`]: 'voice_verified',
          [`${today}_voice`]: audioUrl,
          [`${today}_time`]: new Date().toLocaleTimeString()
        };
        
        const key = `attendance_${corperData.stateCode}_${currentYear}_${currentMonth}`;
        localStorage.setItem(key, JSON.stringify(newData));
        setAttendanceData(newData);
        setTodayStatus('present');
        
        alert('Attendance marked successfully with voice verification!');
      };
      
      recorder.start();
      setIsRecording(true);
      setShowVoiceModal(true);
      
      setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
          setIsRecording(false);
          stream.getTracks().forEach(track => track.stop());
        }
      }, 5000);
      
    } catch (error) {
      alert('Microphone access denied. Please allow microphone access.');
    }
  };

  const markPhysicalAttendance = () => {
    const today = new Date().toDateString();
    const newData = {
      ...attendanceData,
      [today]: 'present',
      [`${today}_method`]: 'coordinator_marked',
      [`${today}_time`]: new Date().toLocaleTimeString()
    };
    
    const key = `attendance_${corperData.stateCode}_${currentYear}_${currentMonth}`;
    localStorage.setItem(key, JSON.stringify(newData));
    setAttendanceData(newData);
    setTodayStatus('present');
    alert('Attendance marked! Coordinator will verify your physical presence.');
  };

  const handleDownloadReport = (type) => {
    const presentCount = Object.values(attendanceData).filter(status => status === 'present').length;
    const totalDays = Object.keys(attendanceData).length;
    const percentage = totalDays > 0 ? Math.round((presentCount / totalDays) * 100) : 0;
    
    const report = {
      corperName: corperData.name,
      stateCode: corperData.stateCode,
      cdsGroup: corperData.cdsGroup,
      month: months[currentMonth],
      year: currentYear,
      totalDays,
      presentCount,
      absentCount: totalDays - presentCount,
      attendancePercentage: percentage,
      detailedRecords: attendanceData
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${corperData.stateCode}_${months[currentMonth]}_${currentYear}_report.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calendarDays = generateCalendar();
  const presentCount = Object.values(attendanceData).filter(status => status === 'present').length;
  const totalMarkedDays = Object.keys(attendanceData).length;
  const percentage = totalMarkedDays > 0 ? Math.round((presentCount / totalMarkedDays) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Attendance Dashboard</h2>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{corperData.name} • {corperData.stateCode}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>CDS Group: {corperData.cdsGroup}</p>
          </div>
          
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="text-center">
              <div className={`text-3xl font-bold ${
                todayStatus === 'present' ? 'text-green-600 dark:text-green-400' :
                todayStatus === 'not_marked' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {todayStatus === 'present' ? 'PRESENT' : 
                 todayStatus === 'not_marked' ? 'PENDING' : 'ABSENT'}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Today's Status</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Monthly Calendar</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{months[currentMonth]} {currentYear}</p>
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
                <div className="flex flex-col items-center space-y-1">
                  {day.status !== 'weekend' && day.status !== 'future' && (
                    <div className={`w-3 h-3 rounded-full ${
                      day.status === 'present' ? 'bg-green-500' :
                      day.status === 'absent' ? 'bg-red-500' :
                      'bg-gray-300'
                    }`}></div>
                  )}
                  {day.status === 'present' && (
                    <div className="text-xs text-green-600 dark:text-green-400">✓</div>
                  )}
                  {day.isToday && todayStatus === 'not_marked' && (
                    <div className="text-xs text-yellow-600 dark:text-yellow-400 animate-pulse">!</div>
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
          <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Absent</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Weekend</span>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="mb-6">
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Mark Today's Attendance</h3>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Choose your attendance method:</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleManualAttendance}
            disabled={todayStatus === 'present'}
            className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white border border-gray-200 hover:bg-gray-50'
            } ${todayStatus === 'present' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-2xl">🔢</div>
            <div className="font-semibold">Enter Daily Code</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Get code from coordinator</div>
          </button>
          
          <button
            onClick={startVoiceRecording}
            disabled={todayStatus === 'present'}
            className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white border border-gray-200 hover:bg-gray-50'
            } ${todayStatus === 'present' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-2xl">🎤</div>
            <div className="font-semibold">Voice Verification</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">For random audit</div>
          </button>
          
          <button
            onClick={markPhysicalAttendance}
            disabled={todayStatus === 'present'}
            className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-2 ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white border border-gray-200 hover:bg-gray-50'
            } ${todayStatus === 'present' ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="text-2xl">👤</div>
            <div className="font-semibold">Physical Presence</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Coordinator will verify</div>
          </button>
        </div>
        
        {todayStatus === 'present' && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center">
            ✓ Attendance already marked for today
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Attendance Summary</h4>
          <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <div className="flex justify-between">
              <span>Days Recorded:</span>
              <span className="font-bold text-gray-800 dark:text-white">{totalMarkedDays}</span>
            </div>
            <div className="flex justify-between">
              <span>Days Present:</span>
              <span className="font-bold text-green-600 dark:text-green-400">{presentCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Days Absent:</span>
              <span className="font-bold text-red-600 dark:text-red-400">{totalMarkedDays - presentCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Attendance Rate:</span>
              <span className="font-bold text-gray-800 dark:text-white">{percentage}%</span>
            </div>
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Attendance</h4>
          <div className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {Object.entries(attendanceData)
              .slice(-5)
              .reverse()
              .map(([date, status]) => (
                <div key={date} className="flex justify-between items-center">
                  <span>{new Date(date).toLocaleDateString()}</span>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    status === 'present' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                  }`}>
                    {status.toUpperCase()}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
          <h4 className={`font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Reports & Downloads</h4>
          <div className="space-y-3">
            <button 
              onClick={() => handleDownloadReport('monthly')}
              className={`w-full text-left p-3 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              📄 Monthly Report (JSON)
            </button>
            <button 
              onClick={() => handleDownloadReport('detailed')}
              className={`w-full text-left p-3 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              📊 Detailed Analytics
            </button>
            <button 
              onClick={() => alert('Print feature coming soon!')}
              className={`w-full text-left p-3 rounded-lg border ${darkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              🖨️ Print Certificate
            </button>
          </div>
        </div>
      </div>

      {showCodeInput && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
          <div className={`p-6 rounded-xl max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Enter Daily Code</h3>
              <button
                onClick={() => {
                  setShowCodeInput(false);
                  setCodeInput('');
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter the daily code provided by your CDS Coordinator:
            </p>
            
            <input
              type="text"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
              placeholder="Enter 4-digit code"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center text-2xl font-mono tracking-widest mb-4"
              maxLength="4"
            />
            
            <div className="flex gap-3">
              <button
                onClick={verifyCodeAndMark}
                className="flex-1 bg-[#008753] text-white py-3 rounded-lg hover:bg-[#006b42] font-medium"
              >
                Verify & Mark
              </button>
              <button
                onClick={() => {
                  setShowCodeInput(false);
                  setCodeInput('');
                }}
                className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
              >
                Cancel
              </button>
            </div>
            
            <p className={`text-sm mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
              Note: The code changes daily and is provided during CDS meetings.
            </p>
          </div>
        </div>
      )}

      {showVoiceModal && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50`}>
          <div className={`p-6 rounded-xl max-w-md w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Voice Verification</h3>
              <button
                onClick={() => {
                  setShowVoiceModal(false);
                  setIsRecording(false);
                  if (mediaRecorder && mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                  }
                }}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>
            
            <div className="text-center mb-6">
              {isRecording ? (
                <div className="space-y-4">
                  <div className="text-4xl animate-pulse">🎤</div>
                  <div className="text-lg font-semibold text-red-600 dark:text-red-400">Recording...</div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Please state your name and state code clearly
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    Example: "I am {corperData.name}, state code {corperData.stateCode}"
                  </div>
                </div>
              ) : audioEvidence ? (
                <div className="space-y-4">
                  <div className="text-4xl text-green-600 dark:text-green-400">✓</div>
                  <div className="text-lg font-semibold">Recording Complete!</div>
                  <audio controls src={audioEvidence} className="w-full" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-4xl">🎤</div>
                  <div className="text-lg font-semibold">Ready to Record</div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    You have been selected for random voice verification
                  </p>
                </div>
              )}
            </div>
            
            {!isRecording && !audioEvidence && (
              <button
                onClick={startVoiceRecording}
                className="w-full bg-[#008753] text-white py-3 rounded-lg hover:bg-[#006b42] font-medium"
              >
                Start Recording
              </button>
            )}
            
            {audioEvidence && (
              <button
                onClick={() => {
                  setShowVoiceModal(false);
                  setAudioEvidence(null);
                }}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-medium"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}