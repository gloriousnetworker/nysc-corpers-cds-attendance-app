'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { API_ENDPOINTS } from '@/lib/api';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    resetCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const codeRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (step === 2 && countdown > 0 && !canResend) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, countdown, canResend]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Password reset code sent to your email');
        setStep(2);
        setCanResend(false);
        setCountdown(30);
      } else {
        throw new Error(data.message || 'Failed to send reset code');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to send reset code');
      setError(err.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const code = formData.resetCode.replace(/\D/g, '');
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          resetCode: code,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Password reset successful! Please login');
        router.push('/login');
      } else {
        throw new Error(data.message || 'Failed to reset password');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to reset password');
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;
    
    setLoading(true);
    setCanResend(false);
    setCountdown(30);

    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('Reset code resent successfully!');
      } else {
        throw new Error(data.message || 'Failed to resend code');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to resend code');
      setCanResend(true);
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

  const handleCodeInput = (index, value) => {
    const digits = value.replace(/\D/g, '');
    if (digits && digits.length > 1) {
      value = digits.charAt(0);
    }

    const newCode = formData.resetCode.split('');
    newCode[index] = digits;
    
    setFormData({
      ...formData,
      resetCode: newCode.join('')
    });
    
    if (digits && index < 5) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !formData.resetCode[index] && index > 0) {
      codeRefs.current[index - 1]?.focus();
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
      
      <div className="relative z-10 w-full max-w-lg">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-[#008753] mb-4">Reset Password</h1>
          <p className="text-gray-600 text-2xl">
            {step === 1 && 'Enter your email to get reset code'}
            {step === 2 && 'Set new password'}
          </p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${step >= num ? 'bg-[#008753] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {num}
                </div>
                {num < 2 && (
                  <div className={`w-16 h-1 ${step > num ? 'bg-[#008753]' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-20 mt-2 text-lg">
            <span className="text-gray-600">Enter Email</span>
            <span className="text-gray-600">New Password</span>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-5 rounded-xl text-lg mb-8">
            {error}
          </div>
        )}
        
        {step === 1 && (
          <form onSubmit={handleEmailSubmit} className="space-y-8">
            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-4">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                placeholder="Enter your registered email"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full rounded-xl bg-[#008753] text-white font-bold py-5 text-2xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Code'}
            </button>
          </form>
        )}
        
        {step === 2 && (
          <form onSubmit={handleResetSubmit} className="space-y-8">
            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-4">
                Verification Code
              </label>
              <div className="flex justify-center space-x-2 mb-4">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <input
                    key={index}
                    ref={el => codeRefs.current[index] = el}
                    type="text"
                    maxLength="1"
                    value={formData.resetCode[index] || ''}
                    onChange={(e) => handleCodeInput(index, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(index, e)}
                    className="w-14 h-14 text-center text-3xl font-mono rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                  />
                ))}
              </div>
              <p className="text-gray-500 text-lg mt-2 text-center">
                Code sent to: {formData.email}
              </p>
            </div>
            
            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-4">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                placeholder="Enter new password"
                minLength="6"
                required
              />
              <p className="text-gray-500 text-lg mt-2">Minimum 6 characters</p>
            </div>
            
            <div>
              <label className="block text-2xl font-semibold text-gray-800 mb-4">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                placeholder="Confirm new password"
                minLength="6"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full rounded-xl bg-[#008753] text-white font-bold py-5 text-2xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={handleResendCode}
                disabled={!canResend || loading}
                className={`text-xl ${canResend ? 'text-[#008753] hover:text-[#006b42]' : 'text-gray-400'} font-medium`}
              >
                {canResend ? 'Resend code' : `Resend code in ${countdown}s`}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <Link href="/login" className="text-[#008753] font-bold text-xl hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}