'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardNavbar from '../../components/dashboard/main-dashboard/DashboardNavbar';
import DashboardSidebar from '../../components/dashboard/main-dashboard/DashboardSidebar';
import DashboardContent from '../../components/dashboard/main-dashboard/DashboardContent';
import * as styles from './styles.js';

export default function CorpersDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('nysc_token');
    const storedUser = localStorage.getItem('nysc_user');
    
    if (!token || !storedUser) {
      router.push('/login');
      return;
    }

    try {
      const user = JSON.parse(storedUser);
      setUserData(user);
    } catch (error) {
      console.error('Error loading user data:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('nysc_token');
    localStorage.removeItem('nysc_user');
    router.push('/login');
  };

  const handleUpdateProfile = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem('nysc_user', JSON.stringify(updatedData));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className={styles.spinner}></div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 mb-4 text-xl">No user data found</div>
          <button
            onClick={() => router.push('/login')}
            className="bg-[#008753] text-white px-8 py-3 rounded-lg hover:bg-[#006b42] transition text-lg"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar 
        userData={userData} 
        onLogout={handleLogout} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <div className="flex pt-16">
        <DashboardSidebar 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        
        <main className="flex-1 p-6 md:p-8">
          <DashboardContent 
            activeSection={activeSection}
            userData={userData}
            onUpdateProfile={handleUpdateProfile}
          />
        </main>
      </div>
    </div>
  );
}