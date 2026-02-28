const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAi = new GoogleGenerativeAI(process.env.GenAiKey);

const callPramaan = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ 
        reply: {
          label: "Invalid",
          points: [],
          keywords: [],
          report_info: null,
          message: "Please provide a text to validate."
        } 
      });
    }

    const model = genAi.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `
You are "Pramaan", a strict AI content validation bot. 
Analyze the user's text and respond strictly in JSON format:

{
  "label": "AI-generated", // or "Copied/Plagiarized", "Valid/Original"
  "points": ["Reason 1", "Reason 2", "..."],
  "keywords": ["keyword1", "keyword2"],
  "report_info": { "url": "https://cybercrime.gov.in/", "message": "You can report potential fake or harmful content here." },
  "message": "Brief summary of assessment"
}
      `
    });

    const result = await model.generateContent(text);
    let rawReply = result.response.text();

    // Remove ```json ... ``` wrapping if present
    rawReply = rawReply.replace(/```json\s*|```/g, "").trim();

    // Parse JSON safely
    let jsonReply;
    try {
      jsonReply = JSON.parse(rawReply);
    } catch {
      jsonReply = {
        label: "Unknown",
        points: [],
        keywords: [],
        report_info: {
          url: "https://cybercrime.gov.in/",
          message: "You can report potential fake or harmful content here."
        },
        message: rawReply
      };
    }

    res.status(200).json({ reply: jsonReply });

  } catch (error) {
    console.error("Error in callPramaan:", error);
    res.status(500).json({
      reply: {
        label: "Error",
        points: [],
        keywords: [],
        report_info: null,
        message: "Error generating response"
      }
    });
  }
};

module.exports = { callPramaan };