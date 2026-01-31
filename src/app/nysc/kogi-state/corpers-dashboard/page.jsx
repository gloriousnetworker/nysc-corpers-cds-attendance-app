'use client';
import { useState, useEffect } from 'react';
import DashboardNavbar from '../../../../components/dashboard/kogi-state-dashboard/DashboardNavbar';
import DashboardSidebar from '../../../../components/dashboard/kogi-state-dashboard/DashboardSidebar';
import DashboardContent from '../../../../components/dashboard/kogi-state-dashboard/DashboardContent';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { useAuth } from '../../../../context/AuthContext';

export default function KogiCorpersDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
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

  const userWithKogiData = {
    ...user,
    lga: user?.localGovernment || 'Lokoja',
    cdsZone: user?.cdsZone || 'Zone 3',
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