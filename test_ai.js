import { getAdviceFromAI } from './fintrack/server/services/aiService.js';

async function test() {
    try {
        console.log("Starting AI test...");
        const advice = await getAdviceFromAI({
            categories: ['Food', 'Bills'],
            income: 120000,
            expense: 40000,
            balance: 80000,
            context: "save for a car"
        });
        console.log("Advice received:");
        console.log(advice);
    } catch (error) {
        console.error("Test failed:");
        console.error(error);
    }
}

test();
