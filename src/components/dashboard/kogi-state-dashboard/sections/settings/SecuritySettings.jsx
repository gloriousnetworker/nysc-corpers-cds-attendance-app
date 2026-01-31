'use client';
import { useState, useEffect, useRef } from 'react';
import { API_ENDPOINTS } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function SecuritySettings({ darkMode, userData }) {
  const [settings, setSettings] = useState({
    security: {
      twoFactor: false,
      loginAlerts: true
    }
  });

  const [twoFactorSetup, setTwoFactorSetup] = useState({
    loading: false,
    step: 0,
    secret: '',
    qrCode: '',
    backupCodes: [],
    verificationCode: '',
    verifying: false,
    secretCopied: false
  });

  const [passwordReset, setPasswordReset] = useState({
    step: 0,
    resetCode: '',
    newPassword: '',
    confirmPassword: '',
    loading: false,
    sent: false
  });

  const [disable2FA, setDisable2FA] = useState({
    show: false,
    code: '',
    loading: false
  });

  const [backupCodes, setBackupCodes] = useState({
    show: false,
    codes: [],
    loading: false
  });

  const codeRefs = useRef([]);
  const resetCodeRefs = useRef([]);
  const disable2FARefs = useRef([]);

  const { logout } = useAuth();

  useEffect(() => {
    const savedSettings = localStorage.getItem('nysc_user_settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (userData) {
      setSettings(prev => ({
        ...prev,
        security: {
          ...prev.security,
          twoFactor: userData.twoFactorEnabled || false
        }
      }));
    }
  }, [userData]);

  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem('nysc_user_settings', JSON.stringify(newSettings));
  };

  const handleToggle = (key) => {
    if (key === 'twoFactor' && !settings.security.twoFactor) {
      initiate2FASetup();
      return;
    }
    
    const updatedSettings = {
      ...settings,
      security: {
        ...settings.security,
        [key]: !settings.security[key]
      }
    };
    saveSettings(updatedSettings);
  };

  const initiate2FASetup = async () => {
    setTwoFactorSetup({ ...twoFactorSetup, loading: true });
    
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('nysc_token='))?.split('=')[1];
      
      const response = await fetch(API_ENDPOINTS.SETUP_2FA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `nysc_token=${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setTwoFactorSetup({
          ...twoFactorSetup,
          loading: false,
          step: 1,
          secret: data.data.secret,
          qrCode: data.data.qrCode,
          backupCodes: data.data.backupCodes
        });
        toast.success('2FA setup initiated successfully');
      } else {
        throw new Error(data.message || 'Failed to initiate 2FA setup');
      }
    } catch (error) {
      setTwoFactorSetup({ ...twoFactorSetup, loading: false });
      toast.error(error.message || 'Failed to initiate 2FA setup');
    }
  };

  const verify2FASetup = async () => {
    const code = twoFactorSetup.verificationCode.replace(/\D/g, '');
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setTwoFactorSetup({ ...twoFactorSetup, verifying: true });
    
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('nysc_token='))?.split('=')[1];
      
      const response = await fetch(API_ENDPOINTS.VERIFY_2FA_SETUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `nysc_token=${token}`
        },
        body: JSON.stringify({
          stateCode: userData?.stateCode,
          twoFactorCode: code
        }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const updatedSettings = {
          ...settings,
          security: {
            ...settings.security,
            twoFactor: true
          }
        };
        saveSettings(updatedSettings);
        
        setTwoFactorSetup({
          loading: false,
          step: 0,
          secret: '',
          qrCode: '',
          backupCodes: [],
          verificationCode: '',
          verifying: false,
          secretCopied: false
        });
        
        toast.success('Two-factor authentication enabled successfully!');
      } else {
        throw new Error(data.message || 'Verification failed');
      }
    } catch (error) {
      setTwoFactorSetup({ ...twoFactorSetup, verifying: false });
      toast.error(error.message || 'Verification failed');
    }
  };

  const handleDisable2FA = async () => {
    const code = disable2FA.code.replace(/\D/g, '');
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setDisable2FA({ ...disable2FA, loading: true });
    
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('nysc_token='))?.split('=')[1];
      
      const response = await fetch(API_ENDPOINTS.DISABLE_2FA, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `nysc_token=${token}`
        },
        body: JSON.stringify({
          twoFactorCode: code
        }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        const updatedSettings = {
          ...settings,
          security: {
            ...settings.security,
            twoFactor: false
          }
        };
        saveSettings(updatedSettings);
        
        setDisable2FA({
          show: false,
          code: '',
          loading: false
        });
        
        toast.success('Two-factor authentication disabled successfully!');
      } else {
        throw new Error(data.message || 'Failed to disable 2FA');
      }
    } catch (error) {
      setDisable2FA({ ...disable2FA, loading: false });
      toast.error(error.message || 'Failed to disable 2FA');
    }
  };

  const generateBackupCodes = async () => {
    setBackupCodes({ ...backupCodes, loading: true });
    
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('nysc_token='))?.split('=')[1];
      
      const response = await fetch(API_ENDPOINTS.GENERATE_BACKUP_CODES, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `nysc_token=${token}`
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setBackupCodes({
          show: true,
          codes: data.data.backupCodes,
          loading: false
        });
        toast.success('New backup codes generated successfully!');
      } else {
        throw new Error(data.message || 'Failed to generate backup codes');
      }
    } catch (error) {
      setBackupCodes({ ...backupCodes, loading: false });
      toast.error(error.message || 'Failed to generate backup codes');
    }
  };

  const sendPasswordResetCode = async () => {
    if (!userData?.email) {
      toast.error('No email address found');
      return;
    }

    setPasswordReset({ ...passwordReset, loading: true });
    
    try {
      const response = await fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userData.email
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setPasswordReset({
          ...passwordReset,
          step: 1,
          loading: false,
          sent: true
        });
        toast.success('Password reset code sent to your email');
      } else {
        throw new Error(data.message || 'Failed to send reset code');
      }
    } catch (error) {
      setPasswordReset({ ...passwordReset, loading: false });
      toast.error(error.message || 'Failed to send reset code');
    }
  };

  const resetPassword = async () => {
    const code = passwordReset.resetCode.replace(/\D/g, '');
    if (code.length !== 6) {
      toast.error('Please enter a valid 6-digit reset code');
      return;
    }

    if (passwordReset.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    if (passwordReset.newPassword !== passwordReset.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setPasswordReset({ ...passwordReset, loading: true });
    
    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: userData.email,
          resetCode: code,
          newPassword: passwordReset.newPassword,
          confirmPassword: passwordReset.confirmPassword
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setPasswordReset({
          step: 0,
          resetCode: '',
          newPassword: '',
          confirmPassword: '',
          loading: false,
          sent: false
        });
        toast.success('Password reset successful!');
      } else {
        throw new Error(data.message || 'Password reset failed');
      }
    } catch (error) {
      setPasswordReset({ ...passwordReset, loading: false });
      toast.error(error.message || 'Password reset failed');
    }
  };

  const copySecretToClipboard = () => {
    navigator.clipboard.writeText(twoFactorSetup.secret);
    setTwoFactorSetup({ ...twoFactorSetup, secretCopied: true });
    setTimeout(() => {
      setTwoFactorSetup(prev => ({ ...prev, secretCopied: false }));
    }, 2000);
  };

  const downloadBackupCodes = () => {
    const codesText = twoFactorSetup.backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nysc_2fa_backup_codes_${userData?.stateCode}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCodeInput = (index, value, refsArray, setStateFunc, fieldName) => {
    const digits = value.replace(/\D/g, '');
    if (digits && digits.length > 1) {
      value = digits.charAt(0);
    }

    const currentCode = setStateFunc === setTwoFactorSetup ? twoFactorSetup.verificationCode : 
                       setStateFunc === setDisable2FA ? disable2FA.code : 
                       passwordReset.resetCode;
    
    const newCode = currentCode.split('');
    newCode[index] = digits;
    
    if (setStateFunc === setTwoFactorSetup) {
      setTwoFactorSetup(prev => ({ ...prev, verificationCode: newCode.join('') }));
    } else if (setStateFunc === setDisable2FA) {
      setDisable2FA(prev => ({ ...prev, code: newCode.join('') }));
    } else if (setStateFunc === setPasswordReset) {
      setPasswordReset(prev => ({ ...prev, resetCode: newCode.join('') }));
    }
    
    if (digits && index < 5) {
      refsArray.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (index, e, refsArray, setStateFunc) => {
    const currentCode = setStateFunc === setTwoFactorSetup ? twoFactorSetup.verificationCode : 
                       setStateFunc === setDisable2FA ? disable2FA.code : 
                       passwordReset.resetCode;
    
    if (e.key === 'Backspace' && !currentCode[index] && index > 0) {
      refsArray.current[index - 1]?.focus();
    }
  };

  const render2FASetupStep = () => {
    switch (twoFactorSetup.step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Step 1: Scan QR Code</h4>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Open your authenticator app and scan this QR code:
              </p>
              
              <div className="flex flex-col items-center space-y-4">
                <div className={`p-4 ${darkMode ? 'bg-white' : 'bg-gray-100'} rounded-lg`}>
                  <img 
                    src={twoFactorSetup.qrCode} 
                    alt="QR Code" 
                    className="w-48 h-48"
                  />
                </div>
                
                <div className="w-full">
                  <div className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Manual Setup Code</div>
                  <div className={`flex items-center space-x-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <code className={`flex-1 font-mono ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                      {twoFactorSetup.secret}
                    </code>
                    <button
                      onClick={copySecretToClipboard}
                      className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} transition`}
                    >
                      {twoFactorSetup.secretCopied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    If you can't scan the QR code, enter this code manually in your authenticator app.
                  </p>
                </div>
                
                <button
                  onClick={() => setTwoFactorSetup({ ...twoFactorSetup, step: 2 })}
                  className="px-6 py-3 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] font-medium transition"
                >
                  Next: Backup Codes
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Step 2: Backup Codes</h4>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Save these backup codes in a safe place:
              </p>
              
              <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                {twoFactorSetup.backupCodes.map((code, index) => (
                  <div
                    key={index}
                    className={`font-mono text-center p-3 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}
                  >
                    {code}
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={downloadBackupCodes}
                  className={`px-6 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
                >
                  Download Backup Codes
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(twoFactorSetup.backupCodes.join('\n'));
                    toast.success('Backup codes copied to clipboard');
                  }}
                  className={`px-6 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
                >
                  Copy All Codes
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
                <p className={`mb-4 ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                  ⚠️ Important: Store these codes securely. Each code can only be used once.
                </p>
                
                <button
                  onClick={() => setTwoFactorSetup({ ...twoFactorSetup, step: 3 })}
                  className="px-6 py-3 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] font-medium transition"
                >
                  Next: Verify Setup
                </button>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Step 3: Verify Setup</h4>
              <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Enter the 6-digit code from your authenticator app:
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-center space-x-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={el => codeRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={twoFactorSetup.verificationCode[index] || ''}
                      onChange={(e) => handleCodeInput(index, e.target.value, codeRefs, setTwoFactorSetup, 'verificationCode')}
                      onKeyDown={(e) => handleCodeKeyDown(index, e, codeRefs, setTwoFactorSetup)}
                      className={`w-12 h-12 text-center text-2xl font-mono rounded-lg border-2 focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={verify2FASetup}
                    disabled={twoFactorSetup.verifying || twoFactorSetup.verificationCode.replace(/\D/g, '').length !== 6}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      twoFactorSetup.verifying || twoFactorSetup.verificationCode.replace(/\D/g, '').length !== 6
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-[#008753] hover:bg-[#006b42]'
                    } text-white transition`}
                  >
                    {twoFactorSetup.verifying ? 'Verifying...' : 'Verify & Enable 2FA'}
                  </button>
                  <button
                    onClick={() => setTwoFactorSetup({ ...twoFactorSetup, step: 2 })}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    } transition`}
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderDisable2FAForm = () => (
    <div className="space-y-6">
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200'}`}>
        <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-red-400' : 'text-red-800'}`}>Disable Two-Factor Authentication</h4>
        <p className={`mb-4 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
          Enter a 6-digit code from your authenticator app or a backup code:
        </p>
        
        <div className="space-y-4">
          <div className="flex justify-center space-x-2 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <input
                key={index}
                ref={el => disable2FARefs.current[index] = el}
                type="text"
                maxLength="1"
                value={disable2FA.code[index] || ''}
                onChange={(e) => handleCodeInput(index, e.target.value, disable2FARefs, setDisable2FA, 'code')}
                onKeyDown={(e) => handleCodeKeyDown(index, e, disable2FARefs, setDisable2FA)}
                className={`w-12 h-12 text-center text-2xl font-mono rounded-lg border-2 focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                  darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleDisable2FA}
              disabled={disable2FA.loading || disable2FA.code.replace(/\D/g, '').length !== 6}
              className={`px-6 py-3 rounded-lg font-medium ${
                disable2FA.loading || disable2FA.code.replace(/\D/g, '').length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              } text-white transition`}
            >
              {disable2FA.loading ? 'Disabling...' : 'Disable 2FA'}
            </button>
            <button
              onClick={() => setDisable2FA({
                show: false,
                code: '',
                loading: false
              })}
              className={`px-6 py-3 rounded-lg font-medium ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              } transition`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBackupCodes = () => (
    <div className="space-y-6">
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
        <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-800'}`}>New Backup Codes</h4>
        <p className={`mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          Save these new backup codes in a safe place:
        </p>
        
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
          {backupCodes.codes.map((code, index) => (
            <div
              key={index}
              className={`font-mono text-center p-3 rounded ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-800'}`}
            >
              {code}
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => {
              const codesText = backupCodes.codes.join('\n');
              const blob = new Blob([codesText], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `nysc_new_backup_codes_${userData?.stateCode}.txt`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className={`px-6 py-2 rounded-lg font-medium ${darkMode ? 'bg-blue-900/30 hover:bg-blue-900/50' : 'bg-blue-100 hover:bg-blue-200'} transition`}
          >
            Download Codes
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(backupCodes.codes.join('\n'));
              toast.success('Backup codes copied to clipboard');
            }}
            className={`px-6 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition`}
          >
            Copy All Codes
          </button>
          <button
            onClick={() => setBackupCodes({ show: false, codes: [], loading: false })}
            className={`px-6 py-2 rounded-lg font-medium ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
            } transition`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const renderPasswordReset = () => {
    if (passwordReset.step === 0) {
      return (
        <div className="space-y-6">
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Change Password</h4>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              A password reset code will be sent to: <strong>{userData?.email}</strong>
            </p>
            
            <button
              onClick={sendPasswordResetCode}
              disabled={passwordReset.loading || passwordReset.sent}
              className={`px-6 py-3 rounded-lg font-medium ${
                passwordReset.loading || passwordReset.sent
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#008753] hover:bg-[#006b42]'
              } text-white transition`}
            >
              {passwordReset.loading ? 'Sending...' : passwordReset.sent ? 'Code Sent' : 'Send Reset Code'}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Reset Password</h4>
            <p className={`mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Enter the 6-digit code sent to <strong>{userData?.email}</strong> and set a new password:
            </p>
            
            <div className="space-y-4">
              <div>
                <div className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  6-Digit Reset Code
                </div>
                <div className="flex justify-center space-x-2 mb-4">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      ref={el => resetCodeRefs.current[index] = el}
                      type="text"
                      maxLength="1"
                      value={passwordReset.resetCode[index] || ''}
                      onChange={(e) => handleCodeInput(index, e.target.value, resetCodeRefs, setPasswordReset, 'resetCode')}
                      onKeyDown={(e) => handleCodeKeyDown(index, e, resetCodeRefs, setPasswordReset)}
                      className={`w-12 h-12 text-center text-2xl font-mono rounded-lg border-2 focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordReset.newPassword}
                  onChange={(e) => setPasswordReset({ ...passwordReset, newPassword: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
                  }`}
                  placeholder="Enter new password"
                  minLength="6"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordReset.confirmPassword}
                  onChange={(e) => setPasswordReset({ ...passwordReset, confirmPassword: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
                  }`}
                  placeholder="Confirm new password"
                  minLength="6"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={resetPassword}
                  disabled={passwordReset.loading || passwordReset.resetCode.replace(/\D/g, '').length !== 6 || passwordReset.newPassword.length < 6 || passwordReset.newPassword !== passwordReset.confirmPassword}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    passwordReset.loading || passwordReset.resetCode.replace(/\D/g, '').length !== 6 || passwordReset.newPassword.length < 6 || passwordReset.newPassword !== passwordReset.confirmPassword
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#008753] hover:bg-[#006b42]'
                  } text-white transition`}
                >
                  {passwordReset.loading ? 'Resetting...' : 'Reset Password'}
                </button>
                <button
                  onClick={() => setPasswordReset({
                    step: 0,
                    resetCode: '',
                    newPassword: '',
                    confirmPassword: '',
                    loading: false,
                    sent: false
                  })}
                  className={`px-6 py-3 rounded-lg font-medium ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                  } transition`}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <div className="space-y-6">
      <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Security Settings</h3>
      
      {settings.security.twoFactor ? (
        <>
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-green-900/30 border-green-800' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${darkMode ? 'bg-green-800' : 'bg-green-100'}`}>
                <span className="text-xl">✅</span>
              </div>
              <div>
                <h4 className={`text-lg font-semibold ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Two-Factor Authentication Enabled</h4>
                <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'}`}>
                  Your account is protected with an extra layer of security
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setDisable2FA({ ...disable2FA, show: true })}
                className={`px-6 py-2 rounded-lg font-medium ${
                  darkMode ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50' : 'bg-red-100 text-red-800 hover:bg-red-200'
                }`}
              >
                Disable 2FA
              </button>
              <button
                onClick={generateBackupCodes}
                disabled={backupCodes.loading}
                className={`px-6 py-2 rounded-lg font-medium ${
                  backupCodes.loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : darkMode ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                }`}
              >
                {backupCodes.loading ? 'Generating...' : 'Generate New Backup Codes'}
              </button>
            </div>
          </div>

          {disable2FA.show && renderDisable2FAForm()}
          {backupCodes.show && renderBackupCodes()}

          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <h4 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Security Options</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Login Alerts</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notify you of new sign-ins</div>
                </div>
                <button 
                  onClick={() => handleToggle('loginAlerts')} 
                  className="relative focus:outline-none"
                >
                  <div className={`w-12 h-6 rounded-full transition ${settings.security.loginAlerts ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.security.loginAlerts ? 'left-7' : 'left-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div>
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Change Password</h4>
                {renderPasswordReset()}
              </div>

              <div>
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Sessions</h4>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Current Session</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chrome • Lagos, Nigeria</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Two-Factor Authentication</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Add an extra layer of security</div>
                </div>
                <button 
                  onClick={() => handleToggle('twoFactor')}
                  disabled={twoFactorSetup.loading}
                  className="relative focus:outline-none disabled:opacity-50"
                >
                  <div className={`w-12 h-6 rounded-full transition ${settings.security.twoFactor ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.security.twoFactor ? 'left-7' : 'left-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              {twoFactorSetup.loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 border-4 border-t-4 border-gray-300 dark:border-gray-600 border-t-[#008753] dark:border-t-green-400 rounded-full animate-spin"></div>
                </div>
              )}

              {render2FASetupStep()}

              <div className="flex items-center justify-between">
                <div>
                  <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Login Alerts</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Notify you of new sign-ins</div>
                </div>
                <button 
                  onClick={() => handleToggle('loginAlerts')} 
                  className="relative focus:outline-none"
                >
                  <div className={`w-12 h-6 rounded-full transition ${settings.security.loginAlerts ? 'bg-[#008753]' : 'bg-gray-400'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      settings.security.loginAlerts ? 'left-7' : 'left-1'
                    }`}></div>
                  </div>
                </button>
              </div>

              <div>
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Change Password</h4>
                {renderPasswordReset()}
              </div>

              <div>
                <h4 className={`font-medium mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Active Sessions</h4>
                <div className="space-y-3">
                  <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-gray-300' : ''}`}>Current Session</div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Chrome • Lagos, Nigeria</div>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm font-medium"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}