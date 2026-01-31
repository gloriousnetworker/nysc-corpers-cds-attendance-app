'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/lib/api';

export default function ContinueRegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleContinueVerification = () => {
    router.push('/signup/verify');
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');

    const email = localStorage.getItem('pending_verification_email');
    
    if (!email) {
      setError('No pending registration found');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Verification code resent successfully!');
      } else {
        throw new Error(data.message || 'Failed to resend code');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to resend code');
      setError(err.message || 'Failed to resend code');
    } finally {
      setLoading(false);
    }
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
        href="/login" 
        className="absolute top-6 left-6 z-20 text-3xl text-[#008753] hover:text-[#006b42] transition"
      >
        &lt;
      </Link>
      
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-2xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-[#008753] mb-4">Continue Registration</h1>
          <p className="text-gray-600 text-2xl">Complete your account verification</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-5 rounded-xl text-lg mb-8">
            {error}
          </div>
        )}
        
        <div className="text-center mb-10">
          <div className="text-7xl mb-6">📝</div>
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Registration Incomplete</h3>
          <p className="text-xl text-gray-600 mb-2">
            We found an incomplete registration for:
          </p>
          <p className="text-2xl font-bold text-[#008753] break-all">
            {typeof window !== 'undefined' ? localStorage.getItem('pending_verification_email') : ''}
          </p>
          <p className="text-lg text-gray-500 mt-2">
            State Code: {typeof window !== 'undefined' ? localStorage.getItem('pending_verification_stateCode') : ''}
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-yellow-800 mb-4">Next Steps Required</h4>
            <ul className="space-y-4 text-lg text-yellow-700">
              <li className="flex items-start">
                <span className="text-2xl mr-3">1.</span>
                <span>Check your email for the verification code</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">2.</span>
                <span>Enter the 6-digit code to verify your account</span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-3">3.</span>
                <span>Complete your profile setup</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <button
              onClick={handleContinueVerification}
              className="w-full px-10 py-5 text-2xl font-bold bg-[#008753] text-white rounded-xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Continue Verification →
            </button>
            
            <button
              onClick={handleResendCode}
              disabled={loading}
              className="w-full px-10 py-5 text-2xl font-bold border-2 border-[#008753] text-[#008753] rounded-xl hover:bg-[#008753] hover:text-white transition-all duration-300"
            >
              {loading ? 'Sending...' : 'Resend Verification Code'}
            </button>
            
            <Link
              href="/signup"
              className="block w-full text-center px-10 py-5 text-2xl font-bold border-2 border-gray-300 text-gray-800 rounded-xl hover:bg-gray-100 transition-all duration-300"
            >
              Start New Registration
            </Link>
          </div>
        </div>
        
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-xl">
            Having issues? Contact support at{' '}
            <a href="mailto:support@nysc-portal.com" className="text-[#008753] font-bold hover:underline">
              support@nysc-portal.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}