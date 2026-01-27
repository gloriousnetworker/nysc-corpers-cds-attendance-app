'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showStateSelection, setShowStateSelection] = useState(false);
  const [requires2FA, setRequires2FA] = useState(false);
  const [twoFactorData, setTwoFactorData] = useState(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const router = useRouter();
  const { login, loginWith2FA } = useAuth();

  const states = [
    { id: 'fct', name: 'FCT', label: 'Federal Capital Territory', route: '/nysc/fct/corpers-dashboard' },
    { id: 'lagos-state', name: 'LAGOS', label: 'Lagos State', route: '/nysc/lagos-state/corpers-dashboard' },
    { id: 'kogi-state', name: 'KOGI', label: 'Kogi State', route: '/nysc/kogi-state/corpers-dashboard' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await login(formData.identifier, formData.password);
      
      if (result.success) {
        const stateRoutes = {
          'Kogi': '/nysc/kogi-state/corpers-dashboard',
          'Lagos': '/nysc/lagos-state/corpers-dashboard',
          'FCT': '/nysc/fct/corpers-dashboard',
          'Federal Capital Territory': '/nysc/fct/corpers-dashboard'
        };
        
        const userState = result.data.servingState;
        const route = stateRoutes[userState] || '/corpers-dashboard';
        router.push(route);
      } else {
        if (result.message.includes('Two-factor')) {
          const twoFactorResult = await fetch('https://nysc-backend.vercel.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          
          const twoFactorResponse = await twoFactorResult.json();
          
          if (twoFactorResponse.success && twoFactorResponse.data.tempToken) {
            setTwoFactorData({
              stateCode: twoFactorResponse.data.stateCode,
              tempToken: twoFactorResponse.data.tempToken
            });
            setRequires2FA(true);
          } else {
            setError(result.message || 'Login failed');
          }
        } else {
          setError(result.message || 'Login failed');
        }
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handle2FASubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (!twoFactorData || !twoFactorCode) {
        setError('Please enter 2FA code');
        setLoading(false);
        return;
      }
      
      const result = await loginWith2FA(
        twoFactorData.stateCode,
        twoFactorCode,
        twoFactorData.tempToken
      );
      
      if (result.success) {
        const stateRoutes = {
          'Kogi': '/nysc/kogi-state/corpers-dashboard',
          'Lagos': '/nysc/lagos-state/corpers-dashboard',
          'FCT': '/nysc/fct/corpers-dashboard',
          'Federal Capital Territory': '/nysc/fct/corpers-dashboard'
        };
        
        const userState = result.data.servingState;
        const route = stateRoutes[userState] || '/corpers-dashboard';
        router.push(route);
      } else {
        setError(result.message || '2FA verification failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
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

  const handleStateSelect = (stateRoute) => {
    const mockUserData = {
      firstName: 'Demo',
      lastName: 'User',
      fullName: 'Demo User',
      email: 'demo@example.com',
      phone: '08012345678',
      stateCode: 'NYSC/2024A/123456',
      servingState: 'Lagos',
      localGovernment: 'Ikeja',
      ppa: 'Ministry of Education',
      cdsGroup: 'Education',
      cdsZone: 'Zone 3'
    };
    
    router.push(stateRoute);
  };

  const handleBackToMain = () => {
    setShowStateSelection(false);
    setRequires2FA(false);
    setTwoFactorData(null);
    setTwoFactorCode('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center py-8 px-4 bg-gray-50 font-playfair relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-contain"
          style={{ backgroundImage: "url('/images/nysc-logo.png')" }}
        ></div>
      </div>
      
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-20 text-3xl text-[#008753] hover:text-[#006b42] transition"
      >
        &lt;
      </Link>
      
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#008753] mb-4">CDS Attendance Portal</h1>
          <p className="text-gray-600 text-2xl">Login to access your attendance records</p>
        </div>
        
        {!showStateSelection ? (
          requires2FA ? (
            <form onSubmit={handle2FASubmit} className="space-y-10">
              {error && (
                <div className="bg-red-50 text-red-600 p-5 rounded-lg text-lg">
                  {error}
                </div>
              )}
              
              <div className="text-center">
                <h2 className="text-3xl font-bold text-[#008753] mb-2">Two-Factor Authentication</h2>
                <p className="text-gray-600 text-xl">Enter the 6-digit code from your authenticator app</p>
                <p className="text-gray-500 text-lg mt-2">State Code: {twoFactorData?.stateCode}</p>
              </div>
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  2FA Code
                </label>
                <input
                  type="text"
                  name="twoFactorCode"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent text-center"
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full rounded-xl bg-[#008753] text-white font-bold py-5 text-2xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify 2FA'}
              </button>
              
              <button
                type="button"
                onClick={handleBackToMain}
                className="w-full rounded-xl border-2 border-gray-300 bg-transparent text-gray-800 font-bold py-4 text-xl hover:bg-gray-100 transition shadow-md"
              >
                ← Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-10">
              {error && (
                <div className="bg-red-50 text-red-600 p-5 rounded-lg text-lg">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  Email or State Code
                </label>
                <input
                  type="text"
                  name="identifier"
                  value={formData.identifier}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                  placeholder="Enter your email or state code"
                  required
                />
              </div>
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="text-right">
                <Link href="/forgot-password" className="text-xl text-[#008753] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              
              <button 
                type="submit" 
                className="w-full rounded-xl bg-[#008753] text-white font-bold py-5 text-2xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              
              <div className="text-center pt-8">
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-gray-100 text-gray-800 font-bold py-5 text-xl rounded-xl hover:bg-gray-200 transition mb-8 shadow-md"
                >
                  Quick Demo Login
                </button>
                
                <div className="border-t pt-8">
                  <span className="text-gray-600 text-xl">Don't have an account? </span>
                  <Link href="/signup" className="text-[#008753] font-bold text-xl hover:underline ml-2">
                    Sign up here
                  </Link>
                </div>
              </div>
            </form>
          )
        ) : (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#008753] mb-2">Select State</h2>
              <p className="text-gray-600 text-xl">Choose your state dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              {states.map((state) => (
                <button
                  key={state.id}
                  onClick={() => handleStateSelect(state.route)}
                  className="w-full rounded-xl border-2 border-gray-300 bg-white px-5 py-6 text-2xl text-[#008753] font-bold hover:bg-gray-50 hover:border-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                >
                  <div className="text-3xl mb-2">{state.name}</div>
                  <div className="text-lg text-gray-600">{state.label}</div>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleBackToMain}
              className="w-full rounded-xl border-2 border-gray-300 bg-transparent text-gray-800 font-bold py-4 text-xl hover:bg-gray-100 transition shadow-md"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}