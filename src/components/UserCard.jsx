import React from 'react';
import { UserPlus, UserMinus, Check, X } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UserCard({ 
  user, 
  showActions = true, 
  isFriend = false, 
  isPending = false,
  requestId
}) {
  const queryClient = useQueryClient();

  const sendFriendRequest = useMutation({
    mutationFn: async () => {
      await axios.post(`http://localhost:5000/api/friends/request/${user._id}`);
    },
    onSuccess: () => {
      toast.success('Friend request sent!');
      queryClient.invalidateQueries(['users']);
    },
    onError: () => {
      toast.error('Failed to send friend request');
    },
  });

  const respondToRequest = useMutation({
    mutationFn: async ({ status }) => {
      await axios.post(`http://localhost:5000/api/friends/respond/${requestId}`, { status });
    },
    onSuccess: (_, { status }) => {
      toast.success(`Friend request ${status}!`);
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['friends']);
    },
    onError: () => {
      toast.error('Failed to respond to friend request');
    },
  });

  const removeFriend = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:5000/api/friends/${user._id}`);
    },
    onSuccess: () => {
      toast.success('Friend removed');
      queryClient.invalidateQueries(['friends']);
    },
    onError: () => {
      toast.error('Failed to remove friend');
    },
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div>
        <h3 className="font-semibold text-xl text-gray-800">{user.username}</h3>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>
      {showActions && (
        <div className="flex gap-3">
          {isFriend ? (
            <button
              onClick={() => removeFriend.mutate()}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              title="Remove friend"
            >
              <UserMinus size={20} />
            </button>
          ) : isPending ? (
            <div className="flex gap-3">
              <button
                onClick={() => respondToRequest.mutate({ status: 'accepted' })}
                className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
                title="Accept request"
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => respondToRequest.mutate({ status: 'rejected' })}
                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                title="Reject request"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => sendFriendRequest.mutate()}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              title="Add friend"
            >
              <UserPlus size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
