'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('https://nysc-backend.vercel.app/api/auth/me', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data && data.data.corper) {
          setUser(data.data.corper);
        } else {
          clearAuth();
        }
      } else {
        clearAuth();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      clearAuth();
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  };

  const login = async (identifier, password) => {
    try {
      const response = await fetch('https://nysc-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const userData = data.data.corper || data.data;
        setUser(userData);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await checkAuth();
        
        return { success: true, data: userData };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const loginWith2FA = async (stateCode, twoFactorCode, tempToken) => {
    try {
      const response = await fetch('https://nysc-backend.vercel.app/api/auth/verify-2fa', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        body: JSON.stringify({ 
          stateCode, 
          twoFactorCode, 
          tempToken 
        }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const userData = data.data.corper;
        setUser(userData);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        await checkAuth();
        
        return { success: true, data: userData };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('2FA login error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const logout = async () => {
    try {
      await fetch('https://nysc-backend.vercel.app/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      router.push('/login');
    }
  };

  const clearAuth = () => {
    setUser(null);
    
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.vercel.app';
      document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;';
    }
  };

  const updateUser = (updatedData) => {
    const mergedData = { ...user, ...updatedData };
    setUser(mergedData);
  };

  const fetchWithAuth = async (url, options = {}) => {
    const defaultOptions = {
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    try {
      const response = await fetch(`https://nysc-backend.vercel.app${url}`, {
        ...defaultOptions,
        ...options,
        headers: {
          ...defaultOptions.headers,
          ...options.headers
        }
      });

      if (response.status === 401) {
        clearAuth();
        router.push('/login');
        throw new Error('Session expired');
      }

      return response;
    } catch (error) {
      if (error.message !== 'Session expired') {
        console.error('API request error:', error);
      }
      throw error;
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await fetchWithAuth('/api/auth/me');
      const data = await response.json();
      
      if (data.success && data.data.corper) {
        setUser(data.data.corper);
        return data.data.corper;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWith2FA,
      logout,
      updateUser,
      fetchWithAuth,
      getCurrentUser,
      clearAuth,
      isAuthenticated: !!user,
      loading,
      authChecked,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};