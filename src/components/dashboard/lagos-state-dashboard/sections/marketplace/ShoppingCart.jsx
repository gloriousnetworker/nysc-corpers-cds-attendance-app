'use client';
import { useState } from 'react';

export default function ShoppingCart({ cart, darkMode, onRemoveItem }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('meetup');
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  const totalCartValue = cart.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = deliveryOption === 'delivery' ? 2000 : 0;
  const totalAmount = totalCartValue + deliveryFee;

  const handleCheckout = () => {
    alert(`Order placed successfully! Total: ₦${totalAmount.toLocaleString()}`);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h3>
        <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Browse items and add them to your cart
        </p>
        <button className="px-6 py-3 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] transition font-bold">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Shopping Cart</h3>
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          {cart.length} item{cart.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className={`flex items-center justify-between p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className="flex items-center">
                  <div className="text-3xl mr-4">{item.image}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">{item.name}</h4>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Seller: {item.seller} • {item.location}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Condition: {item.condition}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-xl font-bold text-[#008753] dark:text-green-400">
                    ₦{item.price.toLocaleString()}
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="font-bold text-gray-800 dark:text-white mb-4">Order Summary</h4>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
              <span className="font-medium text-gray-800 dark:text-white">₦{totalCartValue.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between">
              <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Delivery</span>
              <span className="font-medium text-gray-800 dark:text-white">
                {deliveryOption === 'meetup' ? 'Free' : '₦2,000'}
              </span>
            </div>
            
            <div className={`pt-3 border-t ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
              <div className="flex justify-between">
                <span className="font-bold text-gray-800 dark:text-white">Total</span>
                <span className="text-xl font-bold text-[#008753] dark:text-green-400">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {!showCheckout ? (
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-[#008753] text-white py-3 rounded-lg hover:bg-[#006b42] transition font-bold"
            >
              Proceed to Checkout
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Delivery Option
                </label>
                <div className="space-y-2">
                  {['meetup', 'delivery'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="delivery"
                        value={option}
                        checked={deliveryOption === option}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                        className="mr-2"
                      />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {option === 'meetup' ? 'Meet Seller (Free)' : 'Delivery (₦2,000)'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment Method
                </label>
                <div className="space-y-2">
                  {['transfer', 'cash'].map(method => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-2"
                      />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                        {method === 'transfer' ? 'Bank Transfer' : 'Cash on Delivery'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCheckout(false)}
                  className={`flex-1 py-2 rounded-lg font-medium ${
                    darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleCheckout}
                  className="flex-1 bg-[#008753] text-white py-2 rounded-lg hover:bg-[#006b42] font-bold"
                >
                  Place Order
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}