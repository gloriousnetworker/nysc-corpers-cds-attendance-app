'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '../../../../components/dashboard/fct-dashboard/DashboardNavbar';
import DashboardSidebar from '../../../../components/dashboard/fct-dashboard/DashboardSidebar';
import DashboardContent from '../../../../components/dashboard/fct-dashboard/DashboardContent';

export default function FCTCorpersDashboard() {
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
        const fctUserData = {
          userId: 'FCT-001',
          firstName: 'Chinedu',
          lastName: 'Okoro',
          fullName: 'Chinedu Okoro',
          email: 'chinedu.okoro@nysc.gov.ng',
          stateCode: 'FCT/22C/5678',
          cdsGroup: 'FCT ICT Group',
          servingState: 'FCT Abuja',
          ppa: 'Federal Ministry of Education',
          lga: 'Abuja Municipal',
          cdsZone: 'Zone 4',
          batch: 'Batch B',
          stream: 'Stream II',
          attendanceRate: '92%',
          daysPresent: 44,
          daysAbsent: 4,
          totalDays: 48,
          cdsLocation: 'Area 11 Secretariat',
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('nysc_token', 'fct_user_token_' + Date.now());
        localStorage.setItem('nysc_user', JSON.stringify(fctUserData));
        setUserData(fctUserData);
      } else {
        try {
          const user = JSON.parse(storedUser);
          if (!user.cdsZone) {
            user.cdsZone = 'Zone 4';
            user.lga = 'Abuja Municipal';
            user.cdsLocation = 'Area 11 Secretariat';
          }
          setUserData(user);
        } catch (error) {
          const fctUserData = {
            userId: 'FCT-001',
            firstName: 'Chinedu',
            lastName: 'Okoro',
            fullName: 'Chinedu Okoro',
            email: 'chinedu.okoro@nysc.gov.ng',
            stateCode: 'FCT/22C/5678',
            cdsGroup: 'FCT ICT Group',
            servingState: 'FCT Abuja',
            ppa: 'Federal Ministry of Education',
            lga: 'Abuja Municipal',
            cdsZone: 'Zone 4',
            batch: 'Batch B',
            stream: 'Stream II',
            attendanceRate: '92%',
            daysPresent: 44,
            daysAbsent: 4,
            totalDays: 48,
            cdsLocation: 'Area 11 Secretariat',
            createdAt: new Date().toISOString()
          };
          setUserData(fctUserData);
          localStorage.setItem('nysc_user', JSON.stringify(fctUserData));
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
          <p className="text-gray-600 dark:text-gray-300">Loading FCT Dashboard...</p>
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
            userData={userData}
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