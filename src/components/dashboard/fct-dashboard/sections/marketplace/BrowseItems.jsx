'use client';
import { useState } from 'react';

export default function BrowseItems({ darkMode, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [filterState, setFilterState] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500000]);

  const categories = [
    { id: 'all', label: 'All Items', icon: '🛍️' },
    { id: 'electronics', label: 'Electronics', icon: '📱' },
    { id: 'clothing', label: 'Clothing', icon: '👕' },
    { id: 'books', label: 'Books', icon: '📚' },
    { id: 'housing', label: 'Housing', icon: '🏠' },
    { id: 'furniture', label: 'Furniture', icon: '🪑' },
    { id: 'vehicles', label: 'Vehicles', icon: '🚗' },
    { id: 'services', label: 'Services', icon: '🔧' }
  ];

  const states = ['All States', 'Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Benin'];

  const marketplaceItems = [
    { id: 1, name: 'Samsung Galaxy S21', price: 150000, seller: 'Jane Smith', location: 'Abuja', state: 'Abuja', category: 'electronics', rating: 4.5, image: '📱', condition: 'Used - Good', date: '2 hours ago' },
    { id: 2, name: 'NYSC Boots (Size 42)', price: 12000, seller: 'Michael Brown', location: 'Ikeja', state: 'Lagos', category: 'clothing', rating: 4.2, image: '👢', condition: 'New', date: '5 hours ago' },
    { id: 3, name: 'Law Textbooks Set', price: 15000, seller: 'Sarah Johnson', location: 'PH City', state: 'Port Harcourt', category: 'books', rating: 4.8, image: '📚', condition: 'Used - Excellent', date: '1 day ago' },
    { id: 4, name: '2-Bedroom Apartment', price: 450000, seller: 'David Wilson', location: 'GRA', state: 'Ibadan', category: 'housing', rating: 4.0, image: '🏠', condition: 'Fully Furnished', date: '2 days ago' },
    { id: 5, name: 'Study Desk & Chair', price: 35000, seller: 'Grace Davis', location: 'Enugu', state: 'Enugu', category: 'furniture', rating: 4.7, image: '🪑', condition: 'New', date: '3 days ago' },
    { id: 6, name: 'Kitchen Utensils Set', price: 25000, seller: 'Robert Taylor', location: 'Kano', state: 'Kano', category: 'home', rating: 4.3, image: '🍳', condition: 'Used - Good', date: '1 week ago' },
    { id: 7, name: 'Used Toyota Camry', price: 3500000, seller: 'Linda Martinez', location: 'Abuja', state: 'Abuja', category: 'vehicles', rating: 4.6, image: '🚗', condition: '2018 Model', date: '2 weeks ago' },
    { id: 8, name: 'Lodge Room Available', price: 80000, seller: 'James Anderson', location: 'Surulere', state: 'Lagos', category: 'housing', rating: 4.1, image: '🛏️', condition: 'Monthly Rent', date: '3 days ago' },
    { id: 9, name: 'NYSC Uniform Set', price: 18000, seller: 'Chinedu Okoro', location: 'Awka', state: 'Anambra', category: 'clothing', rating: 4.4, image: '👔', condition: 'New', date: '1 day ago' },
    { id: 10, name: 'Gaming Laptop', price: 280000, seller: 'Fatima Bello', location: 'Kaduna', state: 'Kaduna', category: 'electronics', rating: 4.9, image: '💻', condition: 'Used - Excellent', date: '4 hours ago' },
    { id: 11, name: 'Hostel Space', price: 45000, seller: 'Emmanuel Okafor', location: 'Nsukka', state: 'Enugu', category: 'housing', rating: 4.2, image: '🏘️', condition: 'Shared Apartment', date: '5 days ago' },
    { id: 12, name: 'Bicycle', price: 35000, seller: 'Aisha Mohammed', location: 'Maiduguri', state: 'Borno', category: 'vehicles', rating: 4.0, image: '🚲', condition: 'Good Condition', date: '2 weeks ago' }
  ];

  const filteredItems = marketplaceItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false;
    if (filterState !== 'all' && item.state !== filterState) return false;
    if (item.price < priceRange[0] || item.price > priceRange[1]) return false;
    return true;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
              }`}
            >
              {states.map(state => (
                <option key={state} value={state === 'All States' ? 'all' : state}>{state}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border border-gray-300'
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rating</option>
            </select>

            <div className={`px-4 py-2 rounded-lg ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}>
              Price: ₦{priceRange[0].toLocaleString()} - ₦{priceRange[1].toLocaleString()}
            </div>
          </div>

          <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap transition ${
                  activeCategory === category.id
                    ? 'bg-[#008753] text-white'
                    : `${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div key={item.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition`}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">{item.image}</div>
                  <div className="text-right">
                    <div className={`px-2 py-1 text-xs rounded mb-1 ${
                      item.category === 'housing' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {item.condition}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.date}</div>
                  </div>
                </div>
                
                <h4 className="font-bold text-gray-800 dark:text-white mb-1">{item.name}</h4>
                
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <div>📍 {item.location}, {item.state}</div>
                  <div>👤 {item.seller}</div>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="text-yellow-500">★</div>
                  <div className="text-sm ml-1 text-gray-700 dark:text-gray-300">{item.rating}</div>
                  <div className={`ml-2 text-xs px-2 py-1 rounded ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.category}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-[#008753] dark:text-green-400">
                    ₦{item.price.toLocaleString()}
                    {item.category === 'housing' && <div className="text-xs font-normal">/month</div>}
                  </div>
                  <button
                    onClick={() => onAddToCart(item)}
                    className="px-3 py-1 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] transition text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="font-bold text-gray-800 dark:text-white mb-4">Filters</h4>
          
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Price Range
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className={`flex justify-between text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span>₦0</span>
                  <span>₦1,000,000</span>
                </div>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Condition
              </label>
              <div className="space-y-2">
                {['All', 'New', 'Used - Excellent', 'Used - Good', 'Used - Fair'].map(condition => (
                  <label key={condition} className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            <button className={`w-full py-2 rounded-lg font-medium ${
              darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}