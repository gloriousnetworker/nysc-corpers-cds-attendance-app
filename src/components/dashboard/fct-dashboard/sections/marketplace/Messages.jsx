'use client';
import { useState } from 'react';

export default function Messages({ darkMode }) {
  const [activeChat, setActiveChat] = useState(1);
  const [messageInput, setMessageInput] = useState('');
  const [chats, setChats] = useState([
    {
      id: 1,
      user: 'Jane Smith',
      item: 'Samsung Galaxy S21',
      lastMessage: 'Is the phone still available?',
      time: '10:30 AM',
      unread: 2,
      messages: [
        { id: 1, sender: 'them', text: 'Hello, is the Samsung Galaxy S21 still available?', time: '10:15 AM' },
        { id: 2, sender: 'you', text: 'Yes, it is available', time: '10:20 AM' },
        { id: 3, sender: 'them', text: 'Can I come see it today?', time: '10:25 AM' },
        { id: 4, sender: 'them', text: 'What time works for you?', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      user: 'David Wilson',
      item: '2-Bedroom Apartment',
      lastMessage: 'I\'m interested in the apartment',
      time: 'Yesterday',
      unread: 0,
      messages: [
        { id: 1, sender: 'them', text: 'Hi, I saw your apartment listing', time: '2:30 PM' },
        { id: 2, sender: 'you', text: 'Yes, it\'s still available', time: '3:45 PM' }
      ]
    },
    {
      id: 3,
      user: 'Michael Brown',
      item: 'NYSC Boots',
      lastMessage: 'Thanks for the boots!',
      time: '2 days ago',
      unread: 0,
      messages: [
        { id: 1, sender: 'you', text: 'The boots are available for pickup', time: 'Mon 10:00 AM' },
        { id: 2, sender: 'them', text: 'Thanks, I\'ll come today', time: 'Mon 10:30 AM' }
      ]
    }
  ]);

  const activeChatData = chats.find(chat => chat.id === activeChat);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage = {
      id: activeChatData.messages.length + 1,
      sender: 'you',
      text: messageInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChats(chats.map(chat => 
      chat.id === activeChat 
        ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: messageInput }
        : chat
    ));

    setMessageInput('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
      <div className={`rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <div className={`p-4 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
          <h3 className="font-bold text-gray-800 dark:text-white">Messages</h3>
        </div>
        
        <div className="overflow-y-auto h-[440px]">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => setActiveChat(chat.id)}
              className={`w-full text-left p-4 border-b ${
                activeChat === chat.id
                  ? `${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`
                  : `${darkMode ? 'border-gray-600 hover:bg-gray-600' : 'border-gray-300 hover:bg-gray-100'}`
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="font-bold text-gray-800 dark:text-white">{chat.user}</div>
                  <div className={`text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {chat.item}
                  </div>
                  <div className={`text-sm truncate mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-700'}`}>
                    {chat.lastMessage}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{chat.time}</div>
                  {chat.unread > 0 && (
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center ml-auto">
                      {chat.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-2 flex flex-col">
        <div className={`p-4 rounded-t-lg flex items-center justify-between ${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <div>
            <div className="font-bold text-gray-800 dark:text-white">{activeChatData?.user}</div>
            <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Regarding: {activeChatData?.item}
            </div>
          </div>
          <button className={`px-4 py-2 rounded-lg text-sm ${
            darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}>
            View Item
          </button>
        </div>

        <div className={`flex-1 p-4 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="space-y-4">
            {activeChatData?.messages.map(message => (
              <div
                key={message.id}
                className={`max-w-[80%] ${
                  message.sender === 'you' ? 'ml-auto' : 'mr-auto'
                }`}
              >
                <div className={`p-3 rounded-lg ${
                  message.sender === 'you'
                    ? `${darkMode ? 'bg-[#008753] text-white' : 'bg-[#008753] text-white'}`
                    : `${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`
                }`}>
                  {message.text}
                </div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'} ${
                  message.sender === 'you' ? 'text-right' : 'text-left'
                }`}>
                  {message.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={sendMessage} className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300 bg-white'}`}>
          <div className="flex space-x-3">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className={`flex-1 px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
              }`}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#008753] text-white rounded-lg hover:bg-[#006b42]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}