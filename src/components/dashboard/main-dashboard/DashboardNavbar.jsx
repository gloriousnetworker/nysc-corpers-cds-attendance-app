'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function DashboardNavbar({ userData, onLogout, activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navSections = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'attendance', label: 'Attendance', icon: '📝' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'dues', label: 'CDS Dues', icon: '💰' },
    { id: 'schedule', label: 'Schedule', icon: '📅' },
    { id: 'reports', label: 'Reports', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#008753] rounded-full flex items-center justify-center overflow-hidden mr-3">
                <Image 
                  src="/images/nysc-logo.png" 
                  alt="NYSC Logo" 
                  width={40} 
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-bold text-lg text-[#008753]">NYSC Dashboard</div>
                <div className="text-xs text-gray-600">CDS Attendance Portal</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {navSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    activeSection === section.id
                      ? 'bg-[#008753] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <div className="font-semibold text-gray-800">{userData?.fullName}</div>
              <div className="text-sm text-gray-600">{userData?.stateCode}</div>
            </div>
            
            <button
              onClick={onLogout}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition text-sm font-medium"
            >
              Logout
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-[#008753]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              {navSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-lg font-medium text-left transition ${
                    activeSection === section.id
                      ? 'bg-[#008753] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}