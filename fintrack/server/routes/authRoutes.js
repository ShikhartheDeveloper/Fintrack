import express from 'express';
import { registerUser, loginUser, updateBudget } from '../controllers/authController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/budget', verifyToken, updateBudget);

export default router;
