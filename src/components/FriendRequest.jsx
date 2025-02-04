import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { UserCheck } from 'lucide-react';
import UserCard from './UserCard';

export default function FriendRequests() {
  const { data: requests, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: async () => {
      const response = await axios.get('https://friendconnect-backend.onrender.com/api/friends/requests');
      return response.data;
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <UserCheck className="text-blue-600" size={28} />
        <h2 className="text-2xl font-semibold text-gray-800">Friend Requests</h2>
      </div>

      {isLoading ? (
        <div className="text-center py-4 text-gray-600">Loading...</div>
      ) : requests && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => (
            <UserCard 
              key={request._id} 
              user={request.from}
              isPending={true}
              requestId={request._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No pending friend requests
        </div>
      )}
    </div>
  );
}
