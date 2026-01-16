'use client';
import { useState } from 'react';

export default function Notifications({ darkMode }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'sale',
      title: 'New Purchase',
      message: 'Jane Smith purchased your NYSC Jacket for ₦15,000',
      time: '10 minutes ago',
      read: false,
      icon: '💰'
    },
    {
      id: 2,
      type: 'inquiry',
      title: 'New Inquiry',
      message: 'David Wilson is interested in your 2-Bedroom Apartment',
      time: '2 hours ago',
      read: false,
      icon: '💬'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Message',
      message: 'Michael Brown sent you a message about the NYSC Boots',
      time: '1 day ago',
      read: true,
      icon: '📩'
    },
    {
      id: 4,
      type: 'gem',
      title: 'Gems Earned',
      message: 'You earned 50 gems for completing your profile',
      time: '2 days ago',
      read: true,
      icon: '💎'
    },
    {
      id: 5,
      type: 'promotion',
      title: 'Featured Listing',
      message: 'Your iPhone 12 Pro is now featured on the homepage',
      time: '3 days ago',
      read: true,
      icon: '⭐'
    },
    {
      id: 6,
      type: 'alert',
      title: 'Safety Reminder',
      message: 'Remember to meet buyers in public places',
      time: '1 week ago',
      read: true,
      icon: '⚠️'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Notifications</h3>
          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </div>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="space-y-4">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} ${
              !notification.read ? 'border-l-4 border-[#008753]' : ''
            }`}
          >
            <div className="flex items-start">
              <div className={`text-2xl mr-3 ${
                notification.type === 'sale' ? 'text-green-500' :
                notification.type === 'gem' ? 'text-yellow-500' :
                notification.type === 'alert' ? 'text-red-500' :
                'text-blue-500'
              }`}>
                {notification.icon}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-gray-800 dark:text-white">{notification.title}</div>
                    <div className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {notification.message}
                    </div>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className={`ml-4 text-xs px-2 py-1 rounded ${
                        darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Mark read
                    </button>
                  )}
                </div>
                
                <div className={`text-xs mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {notification.time}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Notification Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800">
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Sales Notifications</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">When someone buys your item</div>
            </div>
            <div className={`w-12 h-6 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
              <div className="w-4 h-4 rounded-full bg-white translate-x-1 translate-y-1"></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800">
            <div>
              <div className="font-medium text-gray-800 dark:text-white">Message Alerts</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">When you receive new messages</div>
            </div>
            <div className={`w-12 h-6 rounded-full ${darkMode ? 'bg-[#008753]' : 'bg-[#008753]'}`}>
              <div className="w-4 h-4 rounded-full bg-white translate-x-7 translate-y-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}