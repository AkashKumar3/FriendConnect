import express from "express";
import { auth } from '../middleware/auth.js';
import {sendFriendRequest, getFriendRequest, respondFriendRequest, getFriendsList, removeFriend} from '../controllers/friendsControllers.js';

const router = express.Router();

router.post('/request/:userId', auth, sendFriendRequest);
router.get('/requests', auth, getFriendRequest);
router.post('/respond/:requestId', auth, respondFriendRequest);
router.get('/', auth, getFriendsList);
router.delete('/:friendId', auth, removeFriend);

export default router;