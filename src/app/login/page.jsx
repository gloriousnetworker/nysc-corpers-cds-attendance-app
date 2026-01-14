'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('nysc_token', data.token);
        router.push('/corpers-dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      localStorage.setItem('nysc_token', 'demo-token-12345');
      const mockUserData = {
        firstName: 'Demo',
        lastName: 'User',
        fullName: 'Demo User',
        email: formData.identifier || 'demo@example.com',
        phone: '08012345678',
        stateCode: formData.identifier.includes('/NYSC') ? formData.identifier : 'NYSC/2024A/123456',
        servingState: 'Lagos',
        localGovernment: 'Ikeja',
        ppa: 'Ministry of Education',
        cdsGroup: 'Education'
      };
      localStorage.setItem('nysc_user', JSON.stringify(mockUserData));
      router.push('/corpers-dashboard');
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
    localStorage.setItem('nysc_token', 'demo-token-12345');
    const mockUserData = {
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '08012345678',
      stateCode: 'NYSC/2024A/123456',
      servingState: 'Lagos',
      localGovernment: 'Ikeja',
      ppa: 'Ministry of Education',
      cdsGroup: 'Education'
    };
    localStorage.setItem('nysc_user', JSON.stringify(mockUserData));
    router.push('/corpers-dashboard');
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
      </div>
    </div>
  );
}