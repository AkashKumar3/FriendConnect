import express from "express";
import { auth } from '../middleware/auth.js';
import {userSearch, recommendation} from '../controllers/usersControllers.js'

const router = express.Router();
router.get('/search', auth, userSearch);
router.get('/recommendations', auth, recommendation);

export default router;