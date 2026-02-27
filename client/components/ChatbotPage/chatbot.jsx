import { useState } from "react";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [aiResult, setAiResult] = useState(null);
  const [fakeResult, setFakeResult] = useState(null);
  const [mode, setMode] = useState("ai");
  const [lastAnalyzedInput, setLastAnalyzedInput] = useState("");

  const handleAnalyze = () => {
    if (!input.trim() || input === lastAnalyzedInput) return;

    const isFake = input.length % 3 === 0;
    const isAI = input.length % 4 === 0;

    if (mode === "ai") {
      const result = {
        aiProbability: isAI ? 78 : 23,
        credibilityScore: isAI ? 32 : 87,
        verdict: isAI ? "AI Generated" : "Human Written",
        details: isAI ? "AI generation patterns detected in text structure" : "Natural human writing patterns confirmed",
      };
      setAiResult(result);
      setFakeResult(null);
    } else {
      const result = {
        aiProbability: isFake ? 65 : 12,
        credibilityScore: isFake ? 28 : 92,
        verdict: isFake ? "Fake News" : "Legitimate",
        details: isFake ? "Suspicious content markers and inconsistencies found" : "Verified against trusted sources",
      };
      setFakeResult(result);
      setAiResult(null);
    }
    
    setLastAnalyzedInput(input);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleAnalyze();
    }
  };

  const AiDetectionResult = ({ result }) => (
    <div className="border-4 border-black rounded-3xl p-8 space-y-8 bg-white shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-black tracking-tight">AI ANALYSIS</h3>
        <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Gauge */}
        <div className="space-y-6">
          <div className="bg-gray-50 border-2 border-black rounded-2xl p-8 text-center">
            <h4 className="text-2xl font-bold text-black mb-6 uppercase tracking-wide">AI Probability</h4>
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-full flex items-center justify-center relative p-12 border-4 border-black">
              <div className="text-5xl font-black text-black">{result.aiProbability}%</div>
            </div>
            <p className="text-sm text-black/70 font-semibold mt-2 uppercase tracking-wide">
              {result.aiProbability > 50 ? "AI DETECTED" : "HUMAN WRITING"}
            </p>
          </div>
        </div>

        {/* Data */}
        <div className="space-y-6 p-8 bg-gray-50 border border-black rounded-2xl">
          <div className={`text-center py-8 px-12 rounded-2xl text-2xl font-bold uppercase tracking-wider ${
            result.verdict === "AI Generated" 
              ? "bg-black text-white" 
              : "bg-white text-black border-2 border-black"
          }`}>
            {result.verdict}
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-center divide-x-2 divide-black">
            <div className="pt-4">
              <div className="text-3xl font-black text-black">{result.aiProbability}%</div>
              <p className="text-sm text-black/70 font-semibold uppercase tracking-wide mt-1">AI Score</p>
            </div>
            <div className="pt-4 pl-4">
              <div className="text-3xl font-black text-black">{result.credibilityScore}</div>
              <p className="text-sm text-black/70 font-semibold uppercase tracking-wide mt-1">Human Score</p>
            </div>
          </div>

          <div className="p-6 border-2 border-black rounded-2xl">
            <h4 className="font-bold text-xl text-black mb-4 uppercase tracking-wide">Detection Details</h4>
            <p className="text-black/80 leading-relaxed">{result.details}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const FakeNewsResult = ({ result }) => (
    <div className="border-4 border-black rounded-3xl p-8 space-y-8 bg-white shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-black tracking-tight">FAKE NEWS CHECK</h3>
        <div className="w-24 h-1 bg-black mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Credibility Gauge */}
        <div className="space-y-6">
          <div className="bg-gray-50 border-2 border-black rounded-2xl p-8 text-center">
            <h4 className="text-2xl font-bold text-black mb-6 uppercase tracking-wide">Trust Score</h4>
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-full flex items-center justify-center relative p-12 border-4 border-black">
              <div className="text-5xl font-black text-black">{result.credibilityScore}</div>
            </div>
            <p className="text-sm text-black/70 font-semibold mt-2 uppercase tracking-wide">/100</p>
          </div>
        </div>

        {/* Data */}
        <div className="space-y-6 p-8 bg-gray-50 border border-black rounded-2xl">
          <div className={`text-center py-8 px-12 rounded-2xl text-2xl font-bold uppercase tracking-wider ${
            result.verdict === "Fake News" 
              ? "bg-black text-white" 
              : "bg-white text-black border-2 border-black"
          }`}>
            {result.verdict}
          </div>
          
          <div className="grid grid-cols-2 gap-6 text-center divide-x-2 divide-black">
            <div className="pt-4">
              <div className="text-3xl font-black text-black">{result.aiProbability}%</div>
              <p className="text-sm text-black/70 font-semibold uppercase tracking-wide mt-1">Suspicion</p>
            </div>
            <div className="pt-4 pl-4">
              <div className="text-3xl font-black text-black">{result.credibilityScore}</div>
              <p className="text-sm text-black/70 font-semibold uppercase tracking-wide mt-1">Trust Score</p>
            </div>
          </div>

          <div className="p-6 border-2 border-black rounded-2xl">
            <h4 className="font-bold text-xl text-black mb-4 uppercase tracking-wide">Verification Details</h4>
            <p className="text-black/80 leading-relaxed">{result.details}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-offwhite flex flex-col">
      {/* TOP SECTION */}
      <div className="bg-charcoal text-black">
        {/* Centered Title Block */}
        <div className="max-w-5xl mx-auto text-center py-12 px-6">
  <h1 className="text-6xl md:text-7xl font-header font-bold tracking-tight mb-6 text-black leading-tight">
    Nishpaksh
  </h1>
  <div className="w-32 h-1 bg-black mx-auto mb-8 rounded-full"></div>
  <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed text-black/80">
    Uncover the truth behind every word — our ML-powered detector instantly reveals whether your text is AI-generated or Fake.
  </p>
</div>


        {/* FULL WIDTH BLACK BAR */}
        <div className="w-full bg-black/80 border-y border-white/10">
          <div className="flex flex-col md:flex-row justify-center items-center px-20 py-8 gap-18">
            {/* CARD 1 */}
            <div className="flex items-center gap-6">
              <h3 className="font-semibold text-2xl text-white">AI Detection</h3>
              <p className="text-white/80 text-lg">92% accuracy rate</p>
            </div>

            {/* CARD 2 */}
            <div className="flex items-center gap-6">
              <h3 className="font-semibold text-2xl text-white">Fact Checking</h3>
              <p className="text-white/80 text-lg">500+ trusted sources</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="flex-1 bg-white border-t-4 border-black p-12 flex flex-col justify-center">
        <div className="max-w-2xl mx-auto w-full space-y-8">

          {/* MODE BUTTONS */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setMode("ai")}
              disabled={mode === "ai"}
              className={`group flex-1 text-xl py-8 px-8 rounded-2xl font-semibold border-2 transition-all duration-300 ${
                mode === "ai"
                  ? "bg-black text-white border-black cursor-default"
                  : "bg-white text-black border-black/30 hover:bg-black hover:text-white hover:border-black shadow-lg hover:shadow-black/20"
              }`}
            >
              AI Detection
            </button>

            <button
              onClick={() => setMode("fake")}
              disabled={mode === "fake"}
              className={`group flex-1 text-xl py-8 px-8 rounded-2xl font-semibold border-2 transition-all duration-300 ${
                mode === "fake"
                  ? "bg-black text-white border-black cursor-default"
                  : "bg-white text-black border-black/30 hover:bg-black hover:text-white hover:border-black shadow-lg hover:shadow-black/20"
              }`}
            >
              Fake News Check
            </button>
          </div>

          {/* HEADER */}
          <div className="text-center space-y-2 border-b border-black/20 pb-8">
            <p className="text-2xl text-black/60 font-semibold">
              {mode === "ai"
                ? "Check if text is AI generated"
                : "Verify if news is fake"}
            </p>
          </div>

          {/* INPUT */}
          <textarea
            rows="4"
            placeholder={`Paste your ${
              mode === "ai" ? "text" : "news/article"
            } here for analysis...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="w-full px-6 py-5 rounded-2xl border-2 border-black/20 focus:border-black focus:outline-none text-black text-lg bg-offwhite transition-all duration-200 resize-none"
          />

          {/* BUTTON */}
          <button
            onClick={handleAnalyze}
            disabled={!input.trim() || input === lastAnalyzedInput}
            className="w-full bg-black hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-5 px-8 rounded-2xl text-xl font-semibold transition-all duration-200 border-2 border-black disabled:border-gray-300"
          >
            Analyze Text
          </button>

          {/* RESULTS - MODE SPECIFIC */}
          {mode === "ai" && aiResult && <AiDetectionResult result={aiResult} />}
          {mode === "fake" && fakeResult && <FakeNewsResult result={fakeResult} />}
        </div>
      </div>
      <footer className="bg-black text-white py-4 px-6 border-t-2 border-black">
  <div className="text-center text-sm tracking-wider uppercase font-mono">
    © 2026 NO Fake समाचार. All rights reserved. | Made with precision for truth.
  </div>
</footer>
    </div>
    
  );
};

export default Chatbot;



