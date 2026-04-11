import mongoose from 'mongoose';

const suggestionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        context: {
            type: String,
            required: true,
        },
        income: {
            type: Number,
            required: true,
        },
        expense: {
            type: Number,
            required: true,
        },
        suggestionText: {
            type: String,
            required: true,
        },
        executionPlan: {
            type: String,
            required: true,
        },
        monthlyGoal: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Suggestion = mongoose.model('Suggestion', suggestionSchema);
export default Suggestion;
