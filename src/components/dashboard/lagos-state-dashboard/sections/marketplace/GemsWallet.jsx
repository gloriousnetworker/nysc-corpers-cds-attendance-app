'use client';
import { useState } from 'react';

export default function GemsWallet({ gems, darkMode }) {
  const [transactionHistory] = useState([
    { id: 1, type: 'earned', amount: 50, description: 'Completed profile', date: 'Today', icon: '📝' },
    { id: 2, type: 'earned', amount: 100, description: 'First listing', date: 'Yesterday', icon: '📋' },
    { id: 3, type: 'earned', amount: 25, description: 'Daily login', date: '2 days ago', icon: '📅' },
    { id: 4, type: 'spent', amount: -50, description: 'Featured listing', date: '3 days ago', icon: '⭐' },
    { id: 5, type: 'earned', amount: 75, description: 'Item sold', date: '1 week ago', icon: '💰' }
  ]);

  const [redeemOptions] = useState([
    { id: 1, name: '₦500 Airtime', cost: 250, icon: '📱' },
    { id: 2, name: 'Featured Listing (3 days)', cost: 150, icon: '⭐' },
    { id: 3, name: 'Marketplace Badge', cost: 500, icon: '🎖️' },
    { id: 4, name: 'Verification Badge', cost: 1000, icon: '✅' },
    { id: 5, name: '₦1,000 Cash', cost: 2000, icon: '💵' },
    { id: 6, name: 'Free Delivery Voucher', cost: 100, icon: '🚚' }
  ]);

  const handleRedeem = (option) => {
    if (gems >= option.cost) {
      alert(`Successfully redeemed ${option.name} for ${option.cost} gems!`);
    } else {
      alert(`You need ${option.cost - gems} more gems to redeem this reward.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gradient-to-br from-yellow-900/50 to-yellow-800/30' : 'bg-gradient-to-br from-yellow-400 to-yellow-500'} text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold flex items-center">
              <span className="mr-2">💎</span>
              {gems.toLocaleString()} Gems
            </div>
            <div className="opacity-90 mt-1">Your marketplace rewards balance</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Earn Rate</div>
            <div className="text-xl font-bold">+10 gems/day</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">How to Earn Gems</h3>
          
          <div className="space-y-4">
            {[
              { task: 'Complete your profile', reward: 50, icon: '📝' },
              { task: 'List your first item', reward: 100, icon: '📋' },
              { task: 'Make a successful sale', reward: 75, icon: '💰' },
              { task: 'Daily login streak', reward: 25, icon: '🔥' },
              { task: 'Leave seller review', reward: 30, icon: '⭐' },
              { task: 'Refer a friend', reward: 200, icon: '👥' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800">
                <div className="flex items-center">
                  <div className="text-xl mr-3">{item.icon}</div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">{item.task}</div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Earn {item.reward} gems</div>
                  </div>
                </div>
                <button className={`px-3 py-1 rounded-lg text-sm ${
                  darkMode ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}>
                  Complete
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Redeem Rewards</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {redeemOptions.map(option => (
              <div key={option.id} className={`p-4 rounded-lg ${
                gems >= option.cost
                  ? `${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-yellow-500`
                  : `${darkMode ? 'bg-gray-800' : 'bg-white'} opacity-75`
              }`}>
                <div className="flex items-center mb-3">
                  <div className="text-2xl mr-2">{option.icon}</div>
                  <div className="font-bold text-gray-800 dark:text-white">{option.name}</div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">💎</span>
                    <span className="font-bold text-gray-800 dark:text-white">{option.cost}</span>
                  </div>
                  
                  <button
                    onClick={() => handleRedeem(option)}
                    disabled={gems < option.cost}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      gems >= option.cost
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Transaction History</h3>
        
        <div className="space-y-3">
          {transactionHistory.map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-gray-800">
              <div className="flex items-center">
                <div className={`text-xl mr-3 ${
                  transaction.type === 'earned' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {transaction.icon}
                </div>
                <div>
                  <div className="font-medium text-gray-800 dark:text-white">{transaction.description}</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{transaction.date}</div>
                </div>
              </div>
              
              <div className={`font-bold ${
                transaction.type === 'earned' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'earned' ? '+' : ''}{transaction.amount} gems
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`p-6 rounded-xl ${darkMode ? 'bg-blue-900/30 border-blue-800' : 'bg-blue-50 border-blue-200'}`}>
        <h3 className="text-lg font-bold text-blue-800 dark:text-blue-400 mb-3">Gem Tips</h3>
        <p className={`mb-4 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
          • Complete daily tasks to earn bonus gems
          • The more you sell, the more gems you earn
          • Use gems to get featured listings for more visibility
          • Redeem gems for cash, airtime, and other rewards
        </p>
        <div className="flex items-center">
          <div className="text-2xl mr-2">🏆</div>
          <div className="font-bold text-blue-800 dark:text-blue-400">Top Earner: 5,280 gems</div>
        </div>
      </div>
    </div>
  );
}