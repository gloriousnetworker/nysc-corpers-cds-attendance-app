'use client';
import { useState } from 'react';

export default function YourListings({ userData, darkMode }) {
  const [userListings, setUserListings] = useState([
    { id: 1, name: 'iPhone 12 Pro', price: 180000, category: 'electronics', status: 'active', date: '2 days ago', image: '📱', views: 45, inquiries: 3 },
    { id: 2, name: 'NYSC Jacket', price: 15000, category: 'clothing', status: 'sold', date: '1 week ago', image: '🧥', views: 28, inquiries: 5 },
    { id: 3, name: 'Textbooks Bundle', price: 8000, category: 'books', status: 'active', date: '3 days ago', image: '📚', views: 32, inquiries: 2 },
    { id: 4, name: 'Room for Rent', price: 65000, category: 'housing', status: 'active', date: '1 day ago', image: '🏠', views: 67, inquiries: 8 }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListing, setNewListing] = useState({
    name: '',
    price: '',
    category: 'electronics',
    description: '',
    condition: 'New'
  });

  const handleCreateListing = (e) => {
    e.preventDefault();
    const newItem = {
      id: userListings.length + 1,
      name: newListing.name,
      price: parseInt(newListing.price),
      category: newListing.category,
      status: 'active',
      date: 'Just now',
      image: newListing.category === 'electronics' ? '📱' : 
             newListing.category === 'clothing' ? '👕' :
             newListing.category === 'housing' ? '🏠' : '📦',
      views: 0,
      inquiries: 0
    };
    
    setUserListings([newItem, ...userListings]);
    setNewListing({ name: '', price: '', category: 'electronics', description: '', condition: 'New' });
    setShowCreateForm(false);
  };

  const handleRemoveListing = (id) => {
    setUserListings(userListings.filter(listing => listing.id !== id));
  };

  const handleMarkAsSold = (id) => {
    setUserListings(userListings.map(listing => 
      listing.id === id ? { ...listing, status: 'sold' } : listing
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Your Listings</h3>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className={`px-4 py-2 rounded-lg font-medium ${
            darkMode ? 'bg-purple-700 text-white hover:bg-purple-600' : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {showCreateForm ? 'Cancel' : '+ Create New Listing'}
        </button>
      </div>

      {showCreateForm && (
        <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <h4 className="font-bold text-gray-800 dark:text-white mb-4">Create New Listing</h4>
          <form onSubmit={handleCreateListing} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Item Name
                </label>
                <input
                  type="text"
                  value={newListing.name}
                  onChange={(e) => setNewListing({...newListing, name: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border border-gray-300'
                  }`}
                  required
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Price (₦)
                </label>
                <input
                  type="number"
                  value={newListing.price}
                  onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border border-gray-300'
                  }`}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  value={newListing.category}
                  onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border border-gray-300'
                  }`}
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="housing">Housing</option>
                  <option value="furniture">Furniture</option>
                  <option value="books">Books</option>
                  <option value="vehicles">Vehicles</option>
                  <option value="services">Services</option>
                </select>
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Condition
                </label>
                <select
                  value={newListing.condition}
                  onChange={(e) => setNewListing({...newListing, condition: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border border-gray-300'
                  }`}
                >
                  <option value="New">New</option>
                  <option value="Used - Excellent">Used - Excellent</option>
                  <option value="Used - Good">Used - Good</option>
                  <option value="Used - Fair">Used - Fair</option>
                </select>
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Description
              </label>
              <textarea
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                rows="3"
                className={`w-full px-4 py-2 rounded-lg ${
                  darkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border border-gray-300'
                }`}
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-[#008753] text-white rounded-lg hover:bg-[#006b42] font-medium"
            >
              Create Listing
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {userListings.map(listing => (
          <div key={listing.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="text-3xl">{listing.image}</div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMarkAsSold(listing.id)}
                  className={`px-3 py-1 text-sm rounded-lg ${
                    listing.status === 'sold'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                  }`}
                >
                  {listing.status === 'sold' ? 'Sold' : 'Mark as Sold'}
                </button>
                <button
                  onClick={() => handleRemoveListing(listing.id)}
                  className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50"
                >
                  Remove
                </button>
              </div>
            </div>

            <h4 className="font-bold text-gray-800 dark:text-white mb-1">{listing.name}</h4>
            
            <div className={`text-sm mb-2 ${
              listing.status === 'active' 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-blue-600 dark:text-blue-400'
            }`}>
              Status: {listing.status === 'active' ? 'Active' : 'Sold'}
            </div>
            
            <div className="text-lg font-bold text-[#008753] dark:text-green-400 mb-3">
              ₦{listing.price.toLocaleString()}
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <div>👁️ {listing.views} views</div>
              <div>💬 {listing.inquiries} inquiries</div>
              <div>{listing.date}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
        <h4 className="font-bold text-gray-800 dark:text-white mb-4">Listing Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            <div className="text-2xl font-bold text-[#008753] dark:text-green-400">
              {userListings.filter(l => l.status === 'active').length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Listings</div>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {userListings.reduce((sum, listing) => sum + listing.views, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Views</div>
          </div>
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-600' : 'bg-white'}`}>
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {userListings.reduce((sum, listing) => sum + listing.inquiries, 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Inquiries</div>
          </div>
        </div>
      </div>
    </div>
  );
}