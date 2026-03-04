const { InferenceClient } = require("@huggingface/inference");
require("dotenv").config();

const HF_API_KEY = process.env.HF_TOKEN;
const HF_MODEL = "fakespot-ai/roberta-base-ai-text-detection-v1";

const analyzeHF = async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "Text is required" });
  }

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

    const top = result[0];
    const label = top.label.toLowerCase();

    let aiProbability;
    if (label.includes("ai")) {
      aiProbability = top.score;
    } else {
      aiProbability = 1 - top.score;
    }

    aiProbability = Math.round(aiProbability * 100);

    const verdict =
      aiProbability > 50 ? "AI Generated" : "Human Written";

    const credibilityScore = 100 - aiProbability;

    const details =
      verdict === "AI Generated"
        ? "AI generation patterns detected in text structure and phrasing."
        : "Natural human writing patterns confirmed.";

    return res.json({
      verdict,
      aiProbability,
      credibilityScore,
      details,
    });
  } catch (err) {
    console.error("HF API Error:", err.message || err);
    return res.status(500).json({ error: "Failed to get prediction" });
  }
};

module.exports = { analyzeHF };