'use client';
import { useState } from 'react';

export default function HelpSection() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = {
    general: [
      { question: 'How do I mark my attendance?', answer: 'Go to the Attendance section and click "Mark Today\'s Attendance" button. You can mark attendance only on CDS days.' },
      { question: 'How can I view my attendance history?', answer: 'Navigate to the Attendance section to see your complete attendance history and calendar view.' },
      { question: 'What should I do if I forgot to mark attendance?', answer: 'Contact your CDS coordinator immediately to report the oversight. You may need to provide a valid reason.' }
    ],
    technical: [
      { question: 'I can\'t login to my account', answer: 'Ensure you\'re using the correct credentials. Try resetting your password or contact support if the issue persists.' },
      { question: 'The dashboard is not loading properly', answer: 'Clear your browser cache and cookies, then try again. Ensure you have a stable internet connection.' },
      { question: 'How do I update my profile information?', answer: 'Go to Profile section, click "Edit Profile", make your changes, and save. Changes are immediate.' }
    ],
    dues: [
      { question: 'How do I pay my CDS dues?', answer: 'Navigate to the Dues section, select the pending payment, and choose your preferred payment method.' },
      { question: 'Where can I see my payment history?', answer: 'In the Dues section, switch to the "Payment History" tab to view all your past payments.' },
      { question: 'What payment methods are accepted?', answer: 'We accept bank transfers, card payments, and USSD transactions.' }
    ]
  };

  const contactOptions = [
    { type: 'email', title: 'Email Support', detail: 'support@nysc-attendance.ng', response: '24-48 hours' },
    { type: 'phone', title: 'Phone Support', detail: '+234 803 000 0000', response: '9AM - 5PM, Mon-Fri' },
    { type: 'whatsapp', title: 'WhatsApp', detail: '+234 815 825 1042', response: '24/7 Chat Support' }
  ];

  const resources = [
    { title: 'User Manual', format: 'PDF', size: '5.2 MB', icon: '📕' },
    { title: 'Video Tutorials', format: 'Video', size: '15 Videos', icon: '🎬' },
    { title: 'FAQs Document', format: 'PDF', size: '2.1 MB', icon: '❓' },
    { title: 'Quick Start Guide', format: 'PDF', size: '1.8 MB', icon: '🚀' }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h3>
            
            <div className="mb-6">
              <div className="flex space-x-4 mb-6">
                {Object.keys(faqCategories).map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      activeCategory === category
                        ? 'bg-[#008753] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category} FAQs
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {faqCategories[activeCategory].map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 font-medium">
                      {faq.question}
                    </button>
                    <div className="p-4 bg-white">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Search Help Articles</h4>
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you need help with?"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008753] focus:border-transparent"
                />
                <button className="px-6 py-3 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] font-medium">
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Contact Support</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactOptions.map((option, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                  <div className="text-3xl mb-4">
                    {option.type === 'email' && '📧'}
                    {option.type === 'phone' && '📞'}
                    {option.type === 'whatsapp' && '💬'}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{option.title}</h4>
                  <div className="text-lg font-medium text-[#008753] mb-2">{option.detail}</div>
                  <div className="text-sm text-gray-600">Response: {option.response}</div>
                  <button className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">
                    Contact Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#008753] to-[#00a86b] text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-4">Help Resources</h3>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <div key={index} className="bg-white/20 p-4 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{resource.icon}</span>
                    <div>
                      <div className="font-bold">{resource.title}</div>
                      <div className="text-sm opacity-90">{resource.format} • {resource.size}</div>
                    </div>
                  </div>
                  <button className="w-full mt-2 py-2 bg-white text-[#008753] rounded-lg hover:bg-gray-100 text-sm font-medium">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-800">Report a Bug</div>
                <div className="text-sm text-gray-600">Found an issue? Let us know</div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-800">Feature Request</div>
                <div className="text-sm text-gray-600">Suggest new features</div>
              </button>
              <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="font-medium text-gray-800">System Status</div>
                <div className="text-sm text-gray-600">Check service availability</div>
              </button>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-800 mb-4">⚠️ Urgent Help</h3>
            <p className="text-yellow-700 mb-4">
              Need immediate assistance with critical issues?
            </p>
            <button className="w-full bg-yellow-100 text-yellow-800 py-3 rounded-lg hover:bg-yellow-200 font-bold">
              Emergency Support
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">Live Chat</h3>
            <p className="text-blue-700 mb-4">
              Chat with our support team in real-time
            </p>
            <button className="w-full bg-blue-100 text-blue-800 py-3 rounded-lg hover:bg-blue-200 font-medium">
              💬 Start Live Chat
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Support Hours</h3>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span className="font-medium">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span className="font-medium text-red-600">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}