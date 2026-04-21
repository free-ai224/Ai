export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: { message: 'Method Not Allowed' } });
    }

    const { prompt, model } = req.body;
    const apiKey = process.env.OPENROUTER_API_KEY; 

    if (!apiKey) {
        return res.status(500).json({ error: { message: 'API key is missing in Vercel.' } });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": model,
                "messages": [{ "role": "user", "content": prompt }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: { message: 'OpenRouter API Fetch Failed' } });
    }
}
