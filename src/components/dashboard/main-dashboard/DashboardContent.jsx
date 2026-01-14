'use client';
import { useState } from 'react';
import OverviewSection from './sections/OverviewSection';
import AttendanceSection from './sections/AttendanceSection';
import ProfileSection from './sections/ProfileSection';
import DuesSection from './sections/DuesSection';
import ScheduleSection from './sections/ScheduleSection';
import ReportsSection from './sections/ReportsSection';
import SettingsSection from './sections/SettingsSection';
import HelpSection from './sections/HelpSection';

export default function DashboardContent({ activeSection, userData, onUpdateProfile }) {
  const renderSection = () => {
    switch(activeSection) {
      case 'overview':
        return <OverviewSection userData={userData} />;
      case 'attendance':
        return <AttendanceSection userData={userData} />;
      case 'profile':
        return <ProfileSection userData={userData} onUpdateProfile={onUpdateProfile} />;
      case 'dues':
        return <DuesSection userData={userData} />;
      case 'schedule':
        return <ScheduleSection userData={userData} />;
      case 'reports':
        return <ReportsSection userData={userData} />;
      case 'settings':
        return <SettingsSection userData={userData} />;
      case 'help':
        return <HelpSection />;
      default:
        return <OverviewSection userData={userData} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          {activeSection === 'overview' && 'Dashboard Overview'}
          {activeSection === 'attendance' && 'Attendance Tracker'}
          {activeSection === 'profile' && 'My Profile'}
          {activeSection === 'dues' && 'CDS Dues Management'}
          {activeSection === 'schedule' && 'CDS Schedule'}
          {activeSection === 'reports' && 'Reports & Analytics'}
          {activeSection === 'settings' && 'Account Settings'}
          {activeSection === 'help' && 'Help & Support'}
        </h1>
        <p className="text-gray-600 mt-2">
          {activeSection === 'overview' && 'Welcome to your NYSC CDS Dashboard'}
          {activeSection === 'attendance' && 'Track and manage your CDS attendance'}
          {activeSection === 'profile' && 'View and update your personal information'}
          {activeSection === 'dues' && 'Manage your CDS group dues and payments'}
          {activeSection === 'schedule' && 'View upcoming CDS activities and meetings'}
          {activeSection === 'reports' && 'Generate and view attendance reports'}
          {activeSection === 'settings' && 'Configure your account preferences'}
          {activeSection === 'help' && 'Get assistance and support'}
        </p>
      </div>
      
      {renderSection()}
    </div>
  );
}