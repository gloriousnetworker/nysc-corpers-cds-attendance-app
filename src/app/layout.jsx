'use client';

import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';

const toastOptions = {
  style: {
    background: '#363636',
    color: '#fff',
    fontSize: '16px',
    padding: '16px 24px',
    borderRadius: '12px',
    fontWeight: '500',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    maxWidth: '500px',
  },
  success: {
    style: {
      background: '#008753',
      color: '#fff',
      borderLeft: '6px solid #00a86b',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#008753',
    },
  },
  error: {
    style: {
      background: '#dc2626',
      color: '#fff',
      borderLeft: '6px solid #ef4444',
    },
    iconTheme: {
      primary: '#fff',
      secondary: '#dc2626',
    },
  },
  loading: {
    style: {
      background: '#374151',
      color: '#fff',
    },
  },
  duration: 4000,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <AuthProvider>
          <Toaster 
            position="top-center" 
            toastOptions={toastOptions}
            containerStyle={{
              top: 24,
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}