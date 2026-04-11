import express from 'express';
import { saveSuggestion, getUserSuggestions, deleteSuggestion } from '../controllers/suggestionController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(verifyToken, saveSuggestion)
    .get(verifyToken, getUserSuggestions);

router.route('/:id')
    .delete(verifyToken, deleteSuggestion);

export default router;
