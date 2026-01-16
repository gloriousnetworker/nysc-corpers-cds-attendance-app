'use client';
import { useState } from 'react';
import OverviewSection from './sections/OverviewSection';
import AttendanceSection from './sections/AttendanceSection';
import ProfileSection from './sections/ProfileSection';
import DuesSection from './sections/DuesSection';
import ScheduleSection from './sections/ScheduleSection';
import MarketplaceSection from './sections/MarketplaceSection';
import ReportsSection from './sections/ReportsSection';
import SettingsSection from './sections/SettingsSection';
import HelpSection from './sections/HelpSection';

export default function DashboardContent({ activeSection, userData, onUpdateProfile, darkMode, toggleDarkMode }) {
  const renderSection = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection userData={userData} darkMode={darkMode} />;
      case 'attendance':
        return <AttendanceSection userData={userData} darkMode={darkMode} />;
      case 'profile':
        return <ProfileSection userData={userData} onUpdateProfile={onUpdateProfile} darkMode={darkMode} />;
      case 'dues':
        return <DuesSection userData={userData} darkMode={darkMode} />;
      case 'schedule':
        return <ScheduleSection userData={userData} darkMode={darkMode} />;
      case 'marketplace':
        return <MarketplaceSection userData={userData} darkMode={darkMode} />;
      case 'reports':
        return <ReportsSection userData={userData} darkMode={darkMode} />;
      case 'settings':
        return <SettingsSection userData={userData} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      case 'help':
        return <HelpSection darkMode={darkMode} />;
      default:
        return <OverviewSection userData={userData} darkMode={darkMode} />;
    }
  };

  const sectionTitles = {
    overview: 'Dashboard Overview',
    attendance: 'Attendance Tracker',
    profile: 'My Profile',
    dues: 'CDS Dues Management',
    schedule: 'CDS Schedule',
    marketplace: 'Marketplace',
    reports: 'Reports & Analytics',
    settings: 'Account Settings',
    help: 'Help & Support'
  };

  const sectionDescriptions = {
    overview: 'Welcome to your NYSC CDS Dashboard',
    attendance: 'Track and manage your CDS attendance',
    profile: 'View and update your personal information',
    dues: 'Manage your CDS group dues and payments',
    schedule: 'View upcoming CDS activities and meetings',
    marketplace: 'Buy and sell items with fellow corpers',
    reports: 'Generate and view attendance reports',
    settings: 'Configure your account preferences',
    help: 'Get assistance and support'
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {sectionTitles[activeSection] || 'Dashboard'}
        </h1>
        <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {sectionDescriptions[activeSection] || 'Manage your account'}
        </p>
      </div>
      
      {renderSection()}
    </div>
  );
}