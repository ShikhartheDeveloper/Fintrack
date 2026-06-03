import Suggestion from '../models/Suggestion.js';

export const saveSuggestion = async (req, res) => {
    try {
        const { context, income, expense, suggestionText, executionPlan, monthlyGoal } = req.body;

        const suggestion = await Suggestion.create({
            userId: req.user._id,
            context,
            income,
            expense,
            suggestionText,
            executionPlan,
            monthlyGoal
        });

        res.status(201).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserSuggestions = async (req, res) => {
    try {
        const suggestions = await Suggestion.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSuggestion = async (req, res) => {
    try {
        const suggestion = await Suggestion.findById(req.params.id);

        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }

        // Check
        if (suggestion.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await suggestion.deleteOne();
        res.json({ message: 'Suggestion removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
