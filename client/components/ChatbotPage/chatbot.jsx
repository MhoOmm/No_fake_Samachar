import { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [fakeResult, setFakeResult] = useState(null);
  const [mode, setMode] = useState("ai");
  const [lastAnalyzedInput, setLastAnalyzedInput] = useState("");

  // const BACKEND_URL = "http://localhost:4000";
  const BACKEND_URL = "https://no-fake-samacharbackend.onrender.com";

  const handleAnalyze = async () => {
    if (!input.trim() || input === lastAnalyzedInput) return;

    try {
      const endpoint =
        mode === "ai"
          ? "/api/chatbot/analyze/hf"
          : "/api/chatbot/analyze/second";

      const res = await fetch(BACKEND_URL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API Error: ${res.status} ${errorText}`);
      }

      const data = await res.json();

      if (mode === "ai") {
        setAiResult(data);
        setFakeResult(null);
      } else {
        setFakeResult(data);
        setAiResult(null);
      }

      setLastAnalyzedInput(input);
    } catch (err) {
      console.error("Error analyzing text:", err);
      alert("Failed to analyze text. Check console for details.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAnalyze();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <header className="bg-white border-b-2 border-black text-center py-16">
        <h1 className="text-6xl font-bold tracking-wide">AI ANALYSIS</h1>
        <div className="w-24 h-1 bg-black mx-auto mt-6"></div>
      </header>

      {/* MAIN */}
      <main className="flex-1 p-12 max-w-5xl mx-auto w-full space-y-10">

        {/* Mode Toggle */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={() => setMode("ai")}
            disabled={mode === "ai"}
            className={`px-10 py-4 rounded-xl border-2 font-semibold transition ${
              mode === "ai"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            AI Detection
          </button>

          <button
            onClick={() => setMode("fake")}
            disabled={mode === "fake"}
            className={`px-10 py-4 rounded-xl border-2 font-semibold transition ${
              mode === "fake"
                ? "bg-black text-white border-black"
                : "bg-white text-black border-black hover:bg-black hover:text-white"
            }`}
          >
            Fake News Check
          </button>
        </div>

        {/* TEXT INPUT */}
        <textarea
          rows="4"
          placeholder="Paste your text here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-6 rounded-xl border-2 border-black/30 focus:border-black outline-none text-lg resize-none"
        />

        {/* ANALYZE BUTTON */}
        <button
          onClick={handleAnalyze}
          disabled={!input.trim() || input === lastAnalyzedInput}
          className="w-full py-5 bg-black text-white rounded-xl text-xl font-semibold hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Analyze Text
        </button>

        {/* ================= AI RESULT UI ================= */}
        {mode === "ai" && aiResult && (
          <div className="mt-16 grid md:grid-cols-2 gap-12">

            {/* LEFT CARD - CIRCLE */}
            <div className="border-2 border-black rounded-3xl p-10 text-center bg-white">
              <h2 className="text-2xl font-bold mb-10 tracking-wide">
                AI PROBABILITY
              </h2>

              <div className="w-60 h-60 mx-auto rounded-full border-4 border-black flex items-center justify-center">
                <span className="text-6xl font-bold">
                  {aiResult.aiProbability}%
                </span>
              </div>

              <p className="mt-8 text-lg font-semibold tracking-wide">
                {aiResult.verdict}
              </p>
            </div>

            {/* RIGHT CARD */}
            <div className="border-2 border-black rounded-3xl p-10 bg-white space-y-10">

              {/* Verdict Box */}
              <div className="bg-black text-white py-8 rounded-2xl text-center">
                <h3 className="text-3xl font-bold tracking-wide">
                  {aiResult.verdict}
                </h3>
              </div>

              {/* AI vs Human */}
              <div className="flex justify-between items-center text-center">
                <div>
                  <p className="text-4xl font-bold">
                    {aiResult.aiProbability}%
                  </p>
                  <p className="mt-2 text-sm tracking-wide">
                    AI SCORE
                  </p>
                </div>

                <div className="h-16 w-px bg-black"></div>

                <div>
                  <p className="text-4xl font-bold">
                    {100 - aiResult.aiProbability}
                  </p>
                  <p className="mt-2 text-sm tracking-wide">
                    HUMAN SCORE
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="border-2 border-black rounded-2xl p-6">
                <h4 className="text-xl font-bold mb-4 tracking-wide">
                  DETECTION DETAILS
                </h4>
                <p className="text-lg">
                  {aiResult.details}
                </p>
              </div>

            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="bg-black text-white text-center py-6 text-sm tracking-wider">
        © 2026 NO Fake समाचार
      </footer>
    </div>
  );
};

export default Chatbot;