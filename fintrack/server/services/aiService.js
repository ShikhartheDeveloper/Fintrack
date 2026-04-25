import dotenv from 'dotenv';
dotenv.config();

export const getAdviceFromAI = async ({ categories, income, expense, balance, context }, attempt = 1) => {
    // If we're not configured, return mock tips
    if (!process.env.NVIDIA_API_KEY && !process.env.ANTHROPIC_API_KEY) {
        return "• Cook more at home to save on Food.\n• Use public transport for Travel.\n• Review and cancel unused Subscriptions.";
    }

    const isShortTips = context === "GIVE_SHORT_TIPS";
    
    // User's specific prompt requirements
    const userPrompt = isShortTips 
        ? `User Spending Data:
- Top 3 Categories: ${categories.join(', ')}
- Income: ₹${income}
- Total Expense: ₹${expense}
- Balance: ₹${balance}

Task: Respond EXACTLY like this: "I spent most on ${categories.join(', ')} this month. Give me 3 practical money-saving tips in 3 short bullet points."
Then provide the 3 bullet points. No conversational filler.`
        : `You are a financial advisor. Here is my exact context:
- Salary/Income: ₹${income || 0}
- Expense: ₹${expense || 0}
- Remaining Balance: ₹${balance || 0}
- Top spending categories: ${categories.join(', ')}
${context ? `- Additional Goals/Context: ${context}` : ''}

Please provide your advice STRICTLY in the following exact format:
ADVICE:- [3-4 high-level money saving tips]
PLAN:- [Step 1, Step 2, Step 3 clear execution steps]
GOAL:- [A specific numerical monthly target]`;

    // Attempting to use NVIDIA as primary (since the key is there)
    // but the user mentioned Claude, so if ANTHROPIC_API_KEY is added later, it will use that.
    const selectedModel = attempt === 1 
        ? (process.env.ANTHROPIC_API_KEY ? "claude-3-haiku-20240307" : "deepseek-ai/deepseek-r1-distill-llama-8b")
        : "meta/llama-3.1-8b-instruct";

    try {
        console.log(`[Attempt ${attempt}] Requesting advice using ${selectedModel}...`);
        
        // If it's a Claude model, we use fetch to Anthropic (simplified implementation)
        if (selectedModel.startsWith('claude')) {
            const response = await fetch("https://api.anthropic.com/v1/messages", {
                method: "POST",
                headers: {
                    "x-api-key": process.env.ANTHROPIC_API_KEY,
                    "anthropic-version": "2023-06-01",
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    model: selectedModel,
                    max_tokens: 1024,
                    messages: [{ role: "user", content: userPrompt }]
                })
            });
            const data = await response.json();
            return data.content[0].text;
        }

        // Existing NVIDIA NIM logic
        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [{ role: "user", content: userPrompt }],
                temperature: 0.1,
                max_tokens: 512
            })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const data = await response.json();
        let content = data.choices[0].message.content || "";
        
        // Strip thinking tags if present
        content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
        
        return content;
    } catch (error) {
        console.error(`AI Error (${selectedModel}):`, error.message);
        if (attempt === 1) return getAdviceFromAI({ categories, income, expense, balance, context }, 2);
        throw error;
    }
};
