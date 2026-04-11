import express from 'express';
import { getAdviceFromAI } from '../services/aiService.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get AI financial advice
// @route   POST /api/ai/advice
// @access  Private
router.post('/advice', verifyToken, async (req, res) => {
    try {
        const { categories, income, expense, balance, context } = req.body;
        if (!categories || !categories.length) {
            return res.status(400).json({ message: 'Categories are required' });
        }
        
        const advice = await getAdviceFromAI({ categories, income, expense, balance, context });
        res.json({ advice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
