// controllers/chatbotController.js
const axios = require("axios");

const HF_API_KEY = process.env.HF_API_KEY || "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";
const HF_MODEL = "fakespot-ai/roberta-base-ai-text-detection-v1";

const analyzeHF = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    try {
        const response = await axios.post(
            `https://api-inference.huggingface.co/models/${HF_MODEL}`,
            { inputs: text },
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        // response.data is usually like: [{label: "AI-generated", score: 0.95}, ...]
        const result = response.data[0]; // take the top prediction
        const verdict = result.label === "AI-generated" ? "AI Generated" : "Human Written";
        const aiProbability = Math.round(result.score * 100); // convert 0-1 to %
        const credibilityScore = 100 - aiProbability; // simple human score
        const details =
            verdict === "AI Generated"
                ? "AI generation patterns detected in text structure"
                : "Natural human writing patterns confirmed";

        res.json({
            verdict,
            aiProbability,
            credibilityScore,
            details,
        });
    } catch (error) {
        console.error("HF API Error:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to get prediction" });
    }
};

module.exports = { analyzeHF };