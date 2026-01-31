'use client';
import { useState } from 'react';
import OverviewSection from './sections/OverviewSection';
import AttendanceSection from './sections/AttendanceSection';
import ProfileSection from './sections/ProfileSection';
import DuesSection from './sections/DuesSection';
import ScheduleSection from './sections/ScheduleSection';
import MarketplaceSection from './sections/MarketplaceSection';
import ReportsSection from './sections/ReportsSection';
import SettingsSection from './sections/settings/SettingsSection';
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
    overview: 'Kogi State NYSC Dashboard - Confluence State',
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
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-gradient-to-r from-[#008753] to-[#FFA500] rounded-lg flex items-center justify-center text-white font-bold">
            KOG
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {sectionTitles[activeSection] || 'Dashboard'}
          </h1>
        </div>
        <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {sectionDescriptions[activeSection] || 'Kogi State Dashboard'}
        </p>
      </div>
      
      {renderSection()}
    </div>
  );
}