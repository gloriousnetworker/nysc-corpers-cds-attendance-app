'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredState = null }) {
  const { user, isAuthenticated, loading, authChecked } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (!loading && authChecked && !isAuthenticated) {
      router.push('/login');
      return;
    }
    
    if (!loading && authChecked && isAuthenticated && requiredState) {
      if (user?.servingState !== requiredState) {
        const stateRoutes = {
          'Kogi': '/nysc/kogi-state/corpers-dashboard',
          'Lagos': '/nysc/lagos-state/corpers-dashboard',
          'FCT': '/nysc/fct/corpers-dashboard',
          'Federal Capital Territory': '/nysc/fct/corpers-dashboard'
        };
        
        const redirectRoute = stateRoutes[user?.servingState] || '/login';
        if (redirectRoute !== window.location.pathname) {
          router.push(redirectRoute);
        }
      }
    }
  }, [loading, authChecked, isAuthenticated, user, requiredState, router]);

  if (loading || !authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}