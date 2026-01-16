'use client';
import { useState } from 'react';
import MarketPlaceNavbar from './marketplace/MarketPlaceNavbar';
import BrowseItems from './marketplace/BrowseItems';
import YourListings from './marketplace/YourListings';
import ShoppingCart from './marketplace/ShoppingCart';
import Messages from './marketplace/Messages';
import Notifications from './marketplace/Notifications';
import GemsWallet from './marketplace/GemsWallet';

export default function MarketplaceSection({ userData, darkMode }) {
  const [activeSection, setActiveSection] = useState('browse');
  const [cart, setCart] = useState([]);
  const [messages] = useState(3);
  const [notifications] = useState(5);
  const [gems] = useState(1250);

  const sections = {
    browse: 'Browse Items',
    listings: 'Your Listings',
    cart: 'Shopping Cart',
    messages: 'Messages',
    notifications: 'Notifications',
    gems: 'Gems Wallet'
  };

  const handleAddToCart = (item) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'browse':
        return <BrowseItems darkMode={darkMode} onAddToCart={handleAddToCart} />;
      case 'listings':
        return <YourListings userData={userData} darkMode={darkMode} />;
      case 'cart':
        return <ShoppingCart cart={cart} darkMode={darkMode} onRemoveItem={handleRemoveFromCart} />;
      case 'messages':
        return <Messages darkMode={darkMode} />;
      case 'notifications':
        return <Notifications darkMode={darkMode} />;
      case 'gems':
        return <GemsWallet gems={gems} darkMode={darkMode} />;
      default:
        return <BrowseItems darkMode={darkMode} onAddToCart={handleAddToCart} />;
    }
  };

  return (
    <div className="space-y-6">
      <MarketPlaceNavbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        darkMode={darkMode}
        messagesCount={messages}
        notificationsCount={notifications}
        gemsCount={gems}
        cartCount={cart.length}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {sections[activeSection] || 'Marketplace'}
        </h1>
        <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {activeSection === 'browse' && 'Buy and sell items with fellow corpers'}
          {activeSection === 'listings' && 'Manage your listings and sales'}
          {activeSection === 'cart' && 'Review items in your shopping cart'}
          {activeSection === 'messages' && 'Chat with buyers and sellers'}
          {activeSection === 'notifications' && 'View marketplace alerts'}
          {activeSection === 'gems' && 'Earn and redeem gems for rewards'}
        </p>
      </div>

      <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        {renderSection()}
      </div>

      {activeSection === 'browse' && (
        <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Marketplace Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="text-2xl mb-2">🤝</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">Meet Safely</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Public places during daylight</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="text-2xl mb-2">✅</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">Verify Items</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Inspect before payment</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="text-2xl mb-2">🏠</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">Housing Section</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Find accommodation</p>
            </div>
            <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <div className="text-2xl mb-2">💎</div>
              <h4 className="font-bold text-gray-800 dark:text-white mb-1">Earn Gems</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get rewards for activity</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}