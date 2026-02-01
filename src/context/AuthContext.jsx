'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_BASE_URL, API_ENDPOINTS } from '@/lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const getAuthCookie = () => {
    if (typeof window === 'undefined') return null;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'nysc_token') return value;
    }
    return null;
  };

  const checkAuth = async () => {
    try {
      const authCookie = getAuthCookie();
      
      if (!authCookie) {
        setLoading(false);
        setAuthChecked(true);
        return;
      }

      const response = await fetch(API_ENDPOINTS.ME, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok && data.success && data.data && data.data.corper) {
        setUser(data.data.corper);
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
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const userData = data.data.corper || data.data;
        setUser(userData);
        
        await checkAuth();
        
        return { success: true, data: userData };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error' };
    }
  };

  const loginWith2FA = async (stateCode, twoFactorCode, tempToken) => {
    try {
      const response = await fetch(API_ENDPOINTS.VERIFY_2FA, {
        method: 'POST',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
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
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include',
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
    
    if (typeof window !== 'undefined') {
      const domain = window.location.hostname.includes('localhost') 
        ? 'localhost' 
        : window.location.hostname.includes('vercel.app')
        ? '.vercel.app'
        : window.location.hostname;
      
      document.cookie = `nysc_token=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await fetch(API_ENDPOINTS.ME, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      
      if (response.ok && data.success && data.data && data.data.corper) {
        const mergedData = { ...data.data.corper, ...updatedData };
        setUser(mergedData);
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const fetchWithAuth = async (url, options = {}) => {
    const defaultOptions = {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
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