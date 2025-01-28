import User from '../models/User.js';

export const userSearch = async(req,res)=> {
  try {
    const { query } = req.query;
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } }
      ],
      _id: { $ne: req.user.userId }
    }).select('-password');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error: error.message });
  }
};

export const recommendation = async(req,res)=> {
    try {
        const user = await User.findById(req.user.userId); 
        const friendIds = user.friends.map(friend => friend._id.toString()); 
        const allUsers = await User.find(); 
        let recommendations = [];
        for (let i = 0; i < allUsers.length; i++) {
          const potentialFriend = allUsers[i]; 
          if (potentialFriend._id.toString() === user._id.toString() || friendIds.includes(potentialFriend._id.toString())) {
            continue; 
          }
      
          let mutualFriendsCount = 0; 
          for (let j = 0; j < potentialFriend.friends.length; j++) {
            if (friendIds.includes(potentialFriend.friends[j].toString())) {
              mutualFriendsCount++; 
            }
          }
          if (mutualFriendsCount > 0) {
            recommendations.push({
              user: potentialFriend, 
              mutualCount: mutualFriendsCount 
            });
          }
        }
        recommendations.sort((a, b) => b.mutualCount - a.mutualCount);
        recommendations = recommendations.slice(0, 5);
        res.json(recommendations);
      } catch (error) {
         res.status(500).json({ message: 'Error getting recommendations', error: error.message });
      }
      
}