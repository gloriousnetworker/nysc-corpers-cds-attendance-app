'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/lib/api';

const nigerianStates = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
];

const cdsGroups = [
  'Education', 'Health & Medical', 'Environment', 'Sports', 'ICT & Digital Skills',
  'Agriculture', 'Skill Acquisition', 'Road Safety', 'Red Cross', 'Media & Publicity',
  'Culture & Tourism', 'Legal Aid'
];

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    stateCode: '',
    servingState: '',
    localGovernment: '',
    ppa: '',
    cdsGroup: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateStateCode = (code) => {
    const pattern = /^[A-Z]{2}\/\d{2}[A-Z]\/\d{4}$/;
    return pattern.test(code);
  };

  const formatStateCode = (value) => {
    const cleaned = value.toUpperCase().replace(/[^A-Z0-9\/]/g, '');
    
    if (cleaned.length <= 2) return cleaned;
    
    if (cleaned.length === 3 && !cleaned.includes('/')) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    }
    
    if (cleaned.length <= 5 && cleaned[2] === '/') {
      const afterSlash = cleaned.slice(3);
      if (afterSlash.length <= 2) return cleaned;
      
      if (afterSlash.length === 3) {
        return cleaned.slice(0, 5) + '/' + cleaned.slice(5);
      }
    }
    
    if (cleaned.length >= 6 && cleaned[2] === '/' && cleaned[5] === '/') {
      const lastPart = cleaned.slice(6).replace(/\D/g, '').slice(0, 4);
      return cleaned.slice(0, 6) + lastPart;
    }
    
    if (cleaned.length >= 5 && cleaned[2] === '/' && cleaned[5] !== '/') {
      const middle = cleaned.slice(3, 6);
      const lastPart = cleaned.slice(6).replace(/\D/g, '').slice(0, 4);
      return cleaned.slice(0, 3) + middle + '/' + lastPart;
    }
    
    return cleaned;
  };

  const handleNext = () => {
    setError('');
    
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError('Please fill all required fields');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError('Please enter a valid email address');
        return;
      }
      
      const phoneRegex = /^[0-9]{11}$/;
      if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        setError('Please enter a valid 11-digit phone number');
        return;
      }
    } else if (step === 2) {
      if (!formData.stateCode || !formData.servingState || !formData.password || !formData.confirmPassword) {
        setError('Please fill all required fields');
        return;
      }
      
      if (!validateStateCode(formData.stateCode)) {
        setError('State Code must be in format: KG/25C/0001');
        return;
      }
      
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    }
    
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 2) {
      setLoading(true);
      setError('');
      
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok && data.success) {
          toast.success(data.message || 'Registration successful! Check email for verification code.');
          localStorage.setItem('pending_verification_email', formData.email);
          localStorage.setItem('pending_verification_stateCode', formData.stateCode);
          router.push('/signup/verify');
        } else {
          throw new Error(data.message || 'Registration failed');
        }
      } catch (err) {
        toast.error(err.message || 'Registration failed. Please try again.');
        setError(err.message || 'Registration failed. Please try again.');
      } finally {
        setLoading(false);
      }
      
      return;
    }
    
    handleNext();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const phoneDigits = value.replace(/\D/g, '').slice(0, 11);
      setFormData({
        ...formData,
        [name]: phoneDigits
      });
    } else if (name === 'stateCode') {
      setFormData({
        ...formData,
        [name]: formatStateCode(value)
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
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
      
      <div className="relative z-10 w-full max-w-4xl">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold text-[#008753] mb-4">CDS Attendance Portal</h1>
          <p className="text-gray-600 text-2xl">Register to start tracking your attendance</p>
        </div>
        
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded-full">
                <div 
                  className="h-3 bg-[#008753] rounded-full transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-6 text-xl font-semibold text-gray-700">
              Step {step} of 2
            </div>
          </div>
          
          <div className="flex justify-between">
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${step >= 1 ? 'bg-[#008753] text-white' : 'bg-gray-200 text-gray-500'}`}>
                1
              </div>
              <div className="mt-2 text-lg font-medium">Basic Info</div>
            </div>
            <div className="text-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold ${step >= 2 ? 'bg-[#008753] text-white' : 'bg-gray-200 text-gray-500'}`}>
                2
              </div>
              <div className="mt-2 text-lg font-medium">NYSC Details</div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="bg-red-50 text-red-600 p-5 rounded-xl text-lg">
              {error}
            </div>
          )}
          
          {step === 1 && (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-2xl font-semibold text-gray-800 mb-4">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-2xl font-semibold text-gray-800 mb-4">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                  placeholder="Enter email address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                  placeholder="08012345678"
                  maxLength="11"
                  required
                />
                <p className="text-gray-500 text-lg mt-2">Format: 11 digits (08012345678)</p>
              </div>
            </div>
          )}
          
          {step === 2 && (
            <div className="space-y-10">
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  State Code *
                </label>
                <input
                  type="text"
                  name="stateCode"
                  value={formData.stateCode}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent uppercase"
                  placeholder="KG/25C/0001"
                  required
                />
                <p className="text-gray-500 text-lg mt-2">Format: KG/25C/0001 (State initials, slash, batch year + stream, slash, 4-digit serial number)</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-2xl font-semibold text-gray-800 mb-4">
                    Serving State *
                  </label>
                  <select
                    name="servingState"
                    value={formData.servingState}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent bg-white"
                    required
                  >
                    <option value="">Select State</option>
                    {nigerianStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-2xl font-semibold text-gray-800 mb-4">
                    Local Government
                  </label>
                  <input
                    type="text"
                    name="localGovernment"
                    value={formData.localGovernment}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                    placeholder="Enter LGA (Optional)"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  Place of Primary Assignment (PPA)
                </label>
                <input
                  type="text"
                  name="ppa"
                  value={formData.ppa}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                  placeholder="Enter your PPA (Optional)"
                />
              </div>
              
              <div>
                <label className="block text-2xl font-semibold text-gray-800 mb-4">
                  CDS Group
                </label>
                <select
                  name="cdsGroup"
                  value={formData.cdsGroup}
                  onChange={handleChange}
                  className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent bg-white"
                >
                  <option value="">Select CDS Group (Optional)</option>
                  {cdsGroups.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <label className="block text-2xl font-semibold text-gray-800 mb-4">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                    placeholder="Create password"
                    minLength="6"
                    required
                  />
                  <p className="text-gray-500 text-lg mt-2">Minimum 6 characters</p>
                </div>
                <div>
                  <label className="block text-2xl font-semibold text-gray-800 mb-4">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full rounded-xl border-2 border-gray-300 px-5 py-5 text-xl focus:outline-none focus:ring-4 focus:ring-[#008753] focus:border-transparent"
                    placeholder="Confirm password"
                    minLength="6"
                    required
                  />
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-between pt-8">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-10 py-5 text-2xl font-bold border-2 border-[#008753] text-[#008753] rounded-xl hover:bg-[#008753] hover:text-white transition-all duration-300"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            
            <button 
              type="submit" 
              className="px-10 py-5 text-2xl font-bold bg-[#008753] text-white rounded-xl hover:bg-[#006b42] focus:outline-none focus:ring-4 focus:ring-[#008753] transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              disabled={loading}
            >
              {loading ? 'Processing...' : step === 2 ? 'Complete Registration' : 'Next Step →'}
            </button>
          </div>
          
          <div className="text-center pt-10 border-t">
            <span className="text-gray-600 text-xl">Already have an account? </span>
            <Link href="/login" className="text-[#008753] font-bold text-xl hover:underline ml-2">
              Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}