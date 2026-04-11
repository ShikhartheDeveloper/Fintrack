import dotenv from 'dotenv';
dotenv.config();

export const getAdviceFromAI = async ({ categories, income, expense, balance, context }, attempt = 1) => {
    if (!process.env.NVIDIA_API_KEY || process.env.NVIDIA_API_KEY === 'your_nvidia_api_key') {
        return "Configure your NVIDIA API Key for real advice.\nMock Tip 1: Cook more at home.\nMock Tip 2: Take public transport.";
    }

    const primaryModel = "deepseek-ai/deepseek-r1-distill-llama-8b";
    const fallbackModel = "meta/llama-3.1-8b-instruct";
    const selectedModel = attempt === 1 ? primaryModel : fallbackModel;

    try {
        const prompt = `You are a financial advisor. Here is my exact context:
- Salary/Income: ₹${income || 0}
- Expense: ₹${expense || 0}
- Remaining Balance: ₹${balance || 0}
- Top spending categories: ${categories.join(', ')}
${context ? `- Additional Goals/Context: ${context}` : ''}

Please provide your advice STRICTLY in the following exact format:
ADVICE:- [3-4 high-level money saving tips contextually tailored to my situation]
PLAN:- [Step 1, Step 2, Step 3 clear execution steps to reach my financial context goal]
GOAL:- [A specific numerical monthly target for saving or investing based on my balance]

Do not output ANY other text outside of this exact format.
CRITICAL: You MUST use the exact headers "ADVICE:-", "PLAN:-" and "GOAL:-" or the system will fail.
Do not use bold characters like ** in headers.
Ensure headers are exactly ADVICE:- , PLAN:- , and GOAL:- 
Example:
ADVICE:- Save on gas...
PLAN:- 1. Use public transport...
GOAL:- ₹15,000 Monthly Save`;

        console.log(`[Attempt ${attempt}] Requesting AI advice from ${selectedModel}...`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout for stability

        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [{ role: "user", content: prompt }],
                temperature: 0.2,
                top_p: 0.7,
                max_tokens: 1024,
                stream: false
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error (${selectedModel}):`, errorText);
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        let content = data.choices[0].message.content || "";
        
        // Strip thinking tags if present
        content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        
        if (!content && attempt === 1) {
            console.log("Empty content received, trying fallback...");
            return getAdviceFromAI({ categories, income, expense, balance, context }, 2);
        }

        return content;
    } catch (error) {
        console.error(`Error with ${selectedModel}:`, error.message);
        
        if (attempt === 1) {
            console.log("Primary model failed, attempting fallback to Llama 3...");
            return getAdviceFromAI({ categories, income, expense, balance, context }, 2);
        }
        
        throw new Error('Failed to get AI advice even after fallback: ' + error.message);
    }
};
