// app/nysc/kogi-state/corpers-dashboard/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '../../../../components/dashboard/kogi-state-dashboard/DashboardNavbar';
import DashboardSidebar from '../../../../components/dashboard/kogi-state-dashboard/DashboardSidebar';
import DashboardContent from '../../../../components/dashboard/kogi-state-dashboard/DashboardContent';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { useAuth } from '../../../../context/AuthContext';

export default function KogiCorpersDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('nysc_user_dark_mode');
    if (savedDarkMode === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('nysc_user_dark_mode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleUpdateProfile = (updatedData) => {
    updateUser(updatedData);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#FFA500] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading Kogi Dashboard...</p>
        </div>
      </div>
    );
  }

  const userWithKogiData = {
    ...user,
    lga: user.localGovernment || 'Lokoja',
    cdsZone: user.cdsZone || 'Zone 3',
    cdsLocation: 'Lokoja Secretariat',
    batch: 'Batch B',
    stream: 'Stream II',
    attendanceRate: '90%',
    daysPresent: 43,
    daysAbsent: 5,
    totalDays: 48
  };

  return (
    <ProtectedRoute requiredState="Kogi">
      <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <DashboardNavbar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onLogout={handleLogout}
          />
          
          <div className="flex pt-16">
            <DashboardSidebar 
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              darkMode={darkMode}
              userData={userWithKogiData}
            />
            
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <DashboardContent 
                activeSection={activeSection}
                userData={userWithKogiData}
                onUpdateProfile={handleUpdateProfile}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
              />
            </main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}