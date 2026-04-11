import dotenv from 'dotenv';
dotenv.config({ path: './fintrack/server/.env' });

async function test() {
    const key = process.env.NVIDIA_API_KEY;
    console.log("Using Key:", key.substring(0, 10) + "...");
    
    try {
        const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${key}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-ai/deepseek-v3.1-terminus",
                messages: [{ role: "user", content: "Hello, give me a very short 1 sentence test response." }],
                temperature: 0.2,
                top_p: 0.7,
                max_tokens: 100,
                stream: false
            })
        });

        console.log("Status:", response.status);
        const data = await response.json();
        console.log("Response Data:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

test();
