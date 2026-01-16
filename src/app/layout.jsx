'use client';

import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Toaster position="top-center" />
          {children}
      </body>
    </html>
  );
}