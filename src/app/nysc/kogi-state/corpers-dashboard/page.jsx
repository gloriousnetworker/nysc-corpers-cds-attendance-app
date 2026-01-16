'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '../../../../components/dashboard/kogi-state-dashboard/DashboardNavbar';
import DashboardSidebar from '../../../../components/dashboard/kogi-state-dashboard/DashboardSidebar';
import DashboardContent from '../../../../components/dashboard/kogi-state-dashboard/DashboardContent';

export default function CorpersDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('nysc_token');
      const storedUser = localStorage.getItem('nysc_user');
      
      if (!token || !storedUser) {
        const mockUserData = {
          userId: 'CORP-001',
          firstName: 'John',
          lastName: 'Doe',
          fullName: 'John Doe',
          email: 'john.doe@nysc.gov.ng',
          stateCode: 'AB/21C/1234',
          cdsGroup: 'ICT Group',
          servingState: 'Abuja',
          ppa: 'Ministry of Education',
          batch: 'Batch A',
          stream: 'Stream I',
          attendanceRate: '85%',
          daysPresent: 41,
          daysAbsent: 7,
          totalDays: 48,
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('nysc_token', 'demo_user_token_' + Date.now());
        localStorage.setItem('nysc_user', JSON.stringify(mockUserData));
        setUserData(mockUserData);
      } else {
        try {
          const user = JSON.parse(storedUser);
          setUserData(user);
        } catch (error) {
          const mockUserData = {
            userId: 'CORP-001',
            firstName: 'John',
            lastName: 'Doe',
            fullName: 'John Doe',
            email: 'john.doe@nysc.gov.ng',
            stateCode: 'AB/21C/1234',
            cdsGroup: 'ICT Group',
            servingState: 'Abuja',
            ppa: 'Ministry of Education',
            batch: 'Batch A',
            stream: 'Stream I',
            attendanceRate: '85%',
            daysPresent: 41,
            daysAbsent: 7,
            totalDays: 48,
            createdAt: new Date().toISOString()
          };
          setUserData(mockUserData);
          localStorage.setItem('nysc_user', JSON.stringify(mockUserData));
        }
      }

      const savedDarkMode = localStorage.getItem('nysc_user_dark_mode');
      if (savedDarkMode === 'true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }

      setLoading(false);
    };

    const timer = setTimeout(() => {
      checkAuth();
    }, 500);

    return () => clearTimeout(timer);
  }, [router]);

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
    localStorage.removeItem('nysc_token');
    localStorage.removeItem('nysc_user');
    localStorage.removeItem('nysc_user_dark_mode');
    router.push('/login');
  };

  const handleUpdateProfile = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem('nysc_user', JSON.stringify(updatedData));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <DashboardNavbar 
          userData={userData} 
          onLogout={handleLogout} 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="flex pt-16">
          <DashboardSidebar 
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            darkMode={darkMode}
          />
          
          <main className="flex-1 p-4 md:p-6 lg:p-8">
          <DashboardContent 
            activeSection={activeSection}
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
          </main>
        </div>
      </div>
    </div>
  );
}