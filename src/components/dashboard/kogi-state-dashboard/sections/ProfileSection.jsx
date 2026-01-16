'use client';
import { useState } from 'react';

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

export default function ProfileSection({ userData, onUpdateProfile, darkMode }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedData = {
        ...formData,
        fullName: `${formData.firstName} ${formData.lastName}`
      };
      
      onUpdateProfile(updatedData);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
    setMessage('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Personal Information</h2>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>View and update your NYSC profile details</p>
        </div>
        
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#008753] text-white px-6 py-2 rounded-lg hover:bg-[#006b42] transition font-medium"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex space-x-3">
            <button
              onClick={handleCancel}
              className={`border ${darkMode ? 'border-gray-600 text-gray-300 hover:bg-gray-800' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} px-6 py-2 rounded-lg transition font-medium`}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[#008753] text-white px-6 py-2 rounded-lg hover:bg-[#006b42] transition font-medium disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${
          message.includes('successfully') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
        }`}>
          {message}
        </div>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              State Code
            </label>
            <input
              type="text"
              name="stateCode"
              value={formData.stateCode}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Serving State
              </label>
              <select
                name="servingState"
                value={formData.servingState}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
                required
              >
                <option value="">Select State</option>
                {nigerianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Local Government
              </label>
              <input
                type="text"
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Place of Primary Assignment (PPA)
            </label>
            <input
              type="text"
              name="ppa"
              value={formData.ppa}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              CDS Group
            </label>
            <select
              name="cdsGroup"
              value={formData.cdsGroup}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'border border-gray-300'}`}
              required
            >
              <option value="">Select CDS Group</option>
              {cdsGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Personal Details</h3>
              <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex justify-between">
                  <span>Full Name:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>State Code:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.stateCode}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>NYSC Details</h3>
              <div className={`space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <div className="flex justify-between">
                  <span>Serving State:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.servingState}</span>
                </div>
                <div className="flex justify-between">
                  <span>Local Government:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.localGovernment}</span>
                </div>
                <div className="flex justify-between">
                  <span>PPA:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.ppa}</span>
                </div>
                <div className="flex justify-between">
                  <span>CDS Group:</span>
                  <span className="font-medium text-gray-800 dark:text-white">{userData.cdsGroup}</span>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Profile Summary</h3>
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-[#008753] rounded-full flex items-center justify-center text-white mr-3">
                    📊
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Attendance Rate</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Current month</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-[#008753] dark:text-green-400">85%</div>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white mr-3">
                    📅
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Service Duration</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>8 of 52 weeks</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-blue-500 dark:text-blue-400">15%</div>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white mr-3">
                    ✅
                  </div>
                  <div>
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Profile Completion</div>
                    <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>All details updated</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-500 dark:text-green-400">100%</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}