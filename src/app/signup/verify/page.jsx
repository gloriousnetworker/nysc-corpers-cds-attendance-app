'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/lib/api';

export default function VerifyPage() {
  const [codes, setCodes] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const inputRefs = useRef([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('pending_verification_email');
    const storedStateCode = localStorage.getItem('pending_verification_stateCode');
    
    if (!storedEmail || !storedStateCode) {
      router.push('/signup');
      return;
    }
    
    setEmail(storedEmail);
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
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
    
    if (index === 5 && value) {
      const verificationCode = newCodes.join('');
      if (verificationCode.length === 6) {
        handleSubmitVerification(verificationCode);
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codes[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const verificationCode = codes.join('');
      if (verificationCode.length === 6) {
        handleSubmitVerification(verificationCode);
      }
    }
  };

  const handleSubmitVerification = async (verificationCode) => {
    setLoading(true);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('pending_verification_email'),
          verificationCode
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Verification successful! Please login.');
        localStorage.removeItem('pending_verification_email');
        localStorage.removeItem('pending_verification_stateCode');
        router.push('/login');
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (err) {
      toast.error(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setResendLoading(true);
    setCanResend(false);
    setCountdown(30);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/resend-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: localStorage.getItem('pending_verification_email')
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
      setCanResend(true);
    } finally {
      setResendLoading(false);
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
        href="/signup" 
        className="absolute top-6 left-6 z-20 text-3xl text-[#008753] hover:text-[#006b42] transition"
      >
        &lt;
      </Link>
      
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="h-12 w-12 border-4 border-t-4 border-gray-300 border-t-[#008753] rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="text-5xl font-bold text-[#008753] mb-6">Verify Your Account</h1>
        <p className="text-gray-600 text-2xl mb-10">Enter the 6-digit verification code sent to your email</p>
        
        <div className="mb-10">
          <div className="text-7xl mb-8">📧</div>
          <p className="text-xl text-gray-600 mb-4">
            Code sent to:
          </p>
          <p className="text-2xl font-bold text-[#008753] break-all">
            {email}
          </p>
        </div>
        
        <div className="mb-12">
          <div className="flex justify-center gap-4 mb-10">
            {codes.map((code, index) => (
              <input
                key={index}
                ref={(el) => inputRefs.current[index] = el}
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
              const verificationCode = codes.join('');
              if (verificationCode.length === 6) {
                handleSubmitVerification(verificationCode);
              } else {
                toast.error('Please enter all 6 digits');
              }
            }}
            disabled={loading}
            className="px-12 py-5 text-2xl font-bold bg-[#008753] text-white rounded-xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
          
          <div>
            <button
              type="button"
              onClick={handleResendCode}
              disabled={!canResend || resendLoading}
              className={`text-xl font-medium ${canResend ? 'text-[#008753] hover:text-[#006b42]' : 'text-gray-400'} transition-colors py-2 px-4 rounded-lg hover:bg-gray-100`}
            >
              {resendLoading ? 'Sending...' : 
               canResend ? 'Resend verification code' : 
               `Resend code in ${countdown}s`}
            </button>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 text-xl">
            Didn't receive the code? Check your spam folder
          </p>
        </div>
        
        <div className="mt-8">
          <Link href="/login" className="text-[#008753] font-bold text-xl hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}