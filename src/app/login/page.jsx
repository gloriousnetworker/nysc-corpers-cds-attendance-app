'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showStateSelection, setShowStateSelection] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter();
  const { login, demoLogin } = useAuth();

  useEffect(() => {
    const savedTheme = localStorage.getItem('nysc_dark_mode');
    if (savedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('nysc_dark_mode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const states = [
    { id: 'fct', name: 'FCT', label: 'Federal Capital Territory', route: '/nysc/fct/corpers-dashboard' },
    { id: 'lagos-state', name: 'LAGOS', label: 'Lagos State', route: '/nysc/lagos-state/corpers-dashboard' },
    { id: 'kogi-state', name: 'KOGI', label: 'Kogi State', route: '/nysc/kogi-state/corpers-dashboard' }
  ];

  const checkRegistrationStatus = async (email) => {
    try {
      const response = await fetch(API_ENDPOINTS.STATUS_CHECK(email));
      const data = await response.json();
      
      if (!data.success && data.message === 'No registration found') {
        router.push('/signup');
        return 'no-registration';
      }
      
      if (data.success && data.data?.status === 'pending') {
        router.push('/login/continue-registration');
        return 'pending';
      }
      
      return 'registered';
    } catch (err) {
      console.error('Error checking registration status:', err);
      return 'error';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const identifier = formData.identifier.trim();
    
    if (!identifier || !formData.password) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }

    const isEmail = identifier.includes('@');
    
    if (isEmail) {
      const status = await checkRegistrationStatus(identifier);
      if (status === 'no-registration' || status === 'pending') {
        setLoading(false);
        return;
      }
    }

    try {
      const result = await login(identifier, formData.password);

      if (result.success) {
        const userData = result.data;
        
        if (userData.requires2FA || userData.twoFactorEnabled) {
          const tempToken = userData.tempToken;
          const stateCode = userData.stateCode;
          router.push(`/login/auth-2fa?tkn=${encodeURIComponent(tempToken)}&stateCode=${encodeURIComponent(stateCode)}`);
        } else {
          const servingState = userData.servingState?.toLowerCase();
          const stateRoutes = {
            'kogi': '/nysc/kogi-state/corpers-dashboard',
            'lagos': '/nysc/lagos-state/corpers-dashboard',
            'fct': '/nysc/fct/corpers-dashboard',
            'federal capital territory': '/nysc/fct/corpers-dashboard'
          };
          
          const route = stateRoutes[servingState] || '/corpers-dashboard';
          toast.success('Login successful!');
          router.push(route);
        }
      } else {
        throw new Error(result.message || 'Login failed');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleDemoLogin = () => {
    setShowStateSelection(true);
  };

  const handleStateSelect = async (stateRoute) => {
    setLoading(true);
    try {
      const result = await demoLogin(stateRoute);
      if (result.success) {
        toast.success('Demo login successful!');
      } else {
        toast.error(result.message || 'Demo login failed');
        setShowStateSelection(false);
      }
    } catch (err) {
      toast.error('Demo login failed. Please try again.');
      setShowStateSelection(false);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToMain = () => {
    setShowStateSelection(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-8 px-4 bg-gray-50 dark:bg-gray-900 font-playfair relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: "url('/images/nysc-logo.png')" }}
        ></div>
      </div>
      
      <div className="absolute top-6 left-6 z-20 flex items-center space-x-4">
        <Link 
          href="/" 
          className="text-3xl text-[#008753] dark:text-green-400 hover:text-[#006b42] dark:hover:text-green-300 transition"
        >
          &lt;
        </Link>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 dark:bg-opacity-40">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 dark:border-gray-600 border-t-[#008753] dark:border-t-green-400 rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#008753] dark:text-green-400 mb-4">CDS Attendance Portal</h1>
          <p className="text-gray-600 dark:text-gray-300 text-2xl">Login to access your attendance records</p>
        </div>
        
        {!showStateSelection ? (
          <form onSubmit={handleSubmit} className="space-y-10">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-5 rounded-lg text-lg">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Email or State Code
              </label>
              <input
                type="text"
                name="identifier"
                value={formData.identifier}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] dark:focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Enter your email or state code"
                required
              />
            </div>
            
            <div>
              <label className="block text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] dark:focus:ring-green-500 focus:border-transparent transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>
            
            <div className="text-right">
              <Link href="/login/forgot-password" className="text-xl text-[#008753] dark:text-green-400 hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className="w-full rounded-xl bg-gradient-to-r from-[#008753] to-[#FFA500] dark:from-green-600 dark:to-amber-600 text-white font-bold py-5 text-2xl hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-[#008753] dark:focus:ring-green-500 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            
            <div className="text-center pt-8">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold py-5 text-xl rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition mb-8 shadow-md"
              >
                Quick Demo Login
              </button>
              
              <div className="border-t border-gray-300 dark:border-gray-700 pt-8">
                <span className="text-gray-600 dark:text-gray-300 text-xl">Don't have an account? </span>
                <Link href="/signup" className="text-[#008753] dark:text-green-400 font-bold text-xl hover:underline ml-2">
                  Sign up here
                </Link>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#008753] dark:text-green-400 mb-2">Select State</h2>
              <p className="text-gray-600 dark:text-gray-300 text-xl">Choose your state dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {states.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateSelect(state.route)}
                  className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-5 py-6 text-2xl text-[#008753] dark:text-green-400 font-bold hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-[#008753] dark:hover:border-green-400 transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                >
                  <div className="text-3xl mb-2">{state.name}</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">{state.label}</div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleBackToMain}
              className="w-full rounded-xl border-2 border-gray-300 dark:border-gray-600 bg-transparent dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-bold py-4 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition shadow-md"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}