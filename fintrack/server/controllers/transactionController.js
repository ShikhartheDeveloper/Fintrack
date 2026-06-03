import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { userId: req.user._id };
        const transactions = await Transaction.find(query)
            .sort({ date: -1 })
            .populate('userId', 'name email');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createTransaction = async (req, res) => {
    try {
        const { type, amount, category, note, date } = req.body;

        const transaction = new Transaction({
            userId: req.user._id,
            type,
            amount,
            category,
            note,
            date: date || Date.now(),
        });

        const createdTransaction = await transaction.save();
        res.status(201).json(createdTransaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        if (transaction.userId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await transaction.deleteOne();
        res.json({ message: 'Transaction removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMonthlyTransactions = async (req, res) => {
    try {
        const matchQuery = req.user.role === 'admin' ? {} : { userId: req.user._id };
        const monthlyStats = await Transaction.aggregate([
            { $match: matchQuery },
            { 
                $group: {
                    _id: { month: { $month: '$date' }, year: { $year: '$date' }, category: '$category', type: '$type' },
                    total: { $sum: '$amount' }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);
        res.json(monthlyStats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
