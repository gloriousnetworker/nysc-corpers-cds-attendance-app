'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';

function Auth2FAContent() {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [stateCode, setStateCode] = useState('');
  const [tempToken, setTempToken] = useState('');
  const router = useRouter();
  const inputRefs = useRef([]);
  const { loginWith2FA } = useAuth();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('tkn');
    const state = urlParams.get('stateCode');
    
    if (!token || !state) {
      router.push('/login');
      return;
    }
    
    setStateCode(state);
    setTempToken(token);
  }, [router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    
    const newCodes = [...codes];
    newCodes[index] = value;
    setCodes(newCodes);
    
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
    
    if (index === 5 && value) {
      const twoFactorCode = newCodes.join('');
      if (twoFactorCode.length === 6) {
        handleSubmitVerification(twoFactorCode);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const twoFactorCode = codes.join('');
      if (twoFactorCode.length === 6) {
        handleSubmitVerification(twoFactorCode);
      }
    }
  };

  const handleSubmitVerification = async (twoFactorCode) => {
    setLoading(true);
    
    if (!tempToken || !stateCode) {
      toast.error('Session expired. Please login again.');
      router.push('/login');
      return;
    }

    try {
      const result = await loginWith2FA(stateCode, twoFactorCode, tempToken);

      if (result.success) {
        const userData = result.data;
        
        const servingState = userData.servingState?.toLowerCase();
        const stateRoutes = {
          'kogi': '/nysc/kogi-state/corpers-dashboard',
          'lagos': '/nysc/lagos-state/corpers-dashboard',
          'fct': '/nysc/fct/corpers-dashboard',
          'federal capital territory': '/nysc/fct/corpers-dashboard'
        };
        
        const route = stateRoutes[servingState] || '/corpers-dashboard';
        toast.success('2FA verification successful!');
        router.push(route);
      } else {
        throw new Error(result.message || '2FA verification failed');
      }
    } catch (err) {
      toast.error(err.message || '2FA verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setResendLoading(true);
    setCanResend(false);
    setCountdown(30);
    
    toast.success('2FA code refreshed. Use your authenticator app.');
    
    setTimeout(() => {
      setResendLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    router.push('/login');
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
        onClick={handleBackToLogin}
      >
        &lt;
      </Link>
      
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-[#008753] mb-6">Two-Factor Authentication</h1>
        <p className="text-gray-600 text-2xl mb-10">Enter the 6-digit code from your authenticator app</p>
        
        <div className="mb-10">
          <div className="text-7xl mb-8">🔐</div>
          <p className="text-xl text-gray-600 mb-4">
            State Code:
          </p>
          <p className="text-2xl font-bold text-[#008753]">
            {stateCode}
          </p>
        </div>
        
        <div className="mb-12">
          <div className="flex justify-center gap-4 mb-10">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength="1"
                value={code}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-20 h-20 text-center text-4xl font-bold rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent bg-white"
                disabled={loading}
                autoFocus={index === 0}
              />
            ))}
          </div>
          
          <p className="text-gray-500 text-lg mb-2">Type each digit or press Enter when complete</p>
          <p className="text-gray-500 text-lg">Use Backspace to navigate backwards</p>
        </div>
        
        <div className="space-y-6">
          <button
            onClick={() => {
              const twoFactorCode = codes.join('');
              if (twoFactorCode.length === 6) {
                handleSubmitVerification(twoFactorCode);
              } else {
                toast.error('Please enter all 6 digits');
              }
            }}
            disabled={loading}
            className="px-12 py-5 text-2xl font-bold bg-[#008753] text-white rounded-xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify 2FA'}
          </button>
          
          <div>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || resendLoading}
              className={`text-xl font-medium ${canResend ? 'text-[#008753] hover:text-[#006b42]' : 'text-gray-400'} transition-colors py-2 px-4 rounded-lg hover:bg-gray-100`}
            >
              {resendLoading ? 'Refreshing...' : 
               canResend ? 'Refresh 2FA Code' : 
               `Refresh in ${countdown}s`}
            </button>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-xl mb-2">
            Open your authenticator app to get the code
          </p>
          <p className="text-gray-500 text-lg">
            Need help? Contact support at{' '}
            <a href="mailto:support@nysc-portal.com" className="text-[#008753] font-bold hover:underline">
              support@nysc-portal.com
            </a>
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleBackToLogin}
            className="text-[#008753] font-bold text-xl hover:underline"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Auth2FAPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading 2FA verification...</p>
        </div>
      </div>
    }>
      <Auth2FAContent />
    </Suspense>
  );
}