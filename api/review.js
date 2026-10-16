export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") return res.status(200).end();

  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  // Debug: tell us exactly what's missing
  if (!GROQ_API_KEY) {
    return res.status(500).json({
      error: "GROQ_API_KEY is missing",
      hint: "Add it in Vercel → Settings → Environment Variables, then Redeploy",
    });
  }

  const RESTAURANT_NAME = process.env.RESTAURANT_NAME || "India Bulls Mega Mall";
  const RESTAURANT_TYPE = process.env.RESTAURANT_TYPE || "shopping mall and food court";
  const RESTAURANT_SPECIALTY =
    process.env.RESTAURANT_SPECIALTY || "variety of food options, shopping, and entertainment";

  const prompt = `Generate a short, genuine-sounding 5-star Google review for ${RESTAURANT_NAME}, a ${RESTAURANT_TYPE} known for ${RESTAURANT_SPECIALTY}. 
Rules:
- 2-4 sentences max
- Sound like a real happy customer, not a bot
- Mention food quality, service, or ambience naturally
- Vary the writing style each time (casual, enthusiastic, simple, detailed)
- No hashtags, no emojis, no "I highly recommend"
- Do NOT start with "I" every time, vary the opening
- Just return the review text, nothing else`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        temperature: 1.2,
        max_tokens: 150,
      }),
    });

    // Return the raw Groq error so we know what went wrong
    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({
        error: "Groq API returned an error",
        status: response.status,
        details: err,
      });
    }

    const data = await response.json();
    const review = data.choices[0].message.content.trim();
    return res.status(200).json({ review });
  } catch (error) {
    return res.status(500).json({
      error: "Fetch failed",
      message: error.message,
    });
  }
}
