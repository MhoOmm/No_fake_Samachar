const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAi = new GoogleGenerativeAI(process.env.GenAiKey);

// Pramaan: AI Content Validator
const callPramaan = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ reply: "Please provide a text to validate." });
    }

    const model = genAi.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
You are "Pramaan", a strict AI content validation bot. 
Your task is to determine whether a given text is AI-generated, copied, or invalid. 

## Instructions:
- Analyze the text provided by the user.
- Respond clearly if the text is:
    - AI-generated
    - Copied/plagiarized
    - Valid/original
- Provide a short explanation why you labeled it invalid or AI-generated.
- Always respond in concise, professional language.
- Example output:
    - "The text appears to be AI-generated because of repetitive phrasing and unnatural structure."
    - "The text seems copied from an online source."
    - "The text looks original and valid."
      `
    });

    const result = await model.generateContent(text);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (error) {
    console.error("Error in callPramaan:", error);
    res.status(500).json({ error: "Error generating response" });
  }
};

module.exports = { callPramaan };