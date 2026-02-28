
// controllers/roberController.js
const { InferenceClient } = require("@huggingface/inference");
require("dotenv").config();

const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL = "fakespot-ai/roberta-base-ai-text-detection-v1";

const analyzeHF = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text is required" });

  try {
    const client = new InferenceClient(HF_API_KEY);

    const result = await client.textClassification({
      model: HF_MODEL,
      inputs: text,
      provider: "hf-inference",
    });

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(500).json({ error: "No prediction returned from HF" });
    }

    const topPrediction = result[0];
    const verdict = topPrediction.label.toLowerCase().includes("ai")
      ? "AI Generated"
      : "Human Written";

    const aiProbability = Math.round(topPrediction.score * 100);
    const credibilityScore = 100 - aiProbability;
    const details =
      verdict === "AI Generated"
        ? "AI generation patterns detected in text structure"
        : "Natural human writing patterns confirmed";

    res.json({ verdict, aiProbability, credibilityScore, details });
  } catch (err) {
    console.error("HF API Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to get prediction" });
  }
};

module.exports = { analyzeHF };