import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import UserCard from '../components/UserCard';
import FriendsList from '../components/FriendsList';
import FriendRequests from '../components/FriendRequest';
import RecommendationsList from '../components/RecommendationsList';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['users', searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const response = await axios.get(`http://localhost:5000/api/users/search?query=${searchQuery}`);
      return response.data;
    },
    enabled: !!searchQuery && isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Please login to continue</h1>
        <p className="text-lg text-gray-500">Access all features after logging in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : searchResults?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {searchResults.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-4 text-gray-500">No users found</div>
            ) : null}
          </div>

          {/* Friend Requests */}
          <div>
            <FriendRequests />
          </div>

          {/* Friends List */}
          <div>
            <FriendsList />
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1">
          {/* Recommendations List */}
          <div>
            <RecommendationsList />
          </div>
        </div>
      </div>
    </div>
  );
}
