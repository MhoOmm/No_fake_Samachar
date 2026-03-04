import axios from "axios";

const analyzeWithModel = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await axios.post(
      "http://localhost:3000/predict",
      { text }
    );

    const { prediction, probability } = response.data;

    res.json({
      verdict: prediction === 0 ? "Fake News" : "Real News",
      confidence: Math.round(probability * 100),
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "ML service error" });
  }
};

export { analyzeWithModel };