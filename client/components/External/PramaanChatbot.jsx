import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Pramaan = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [{
        text: "Welcome to Pramaan AI. Paste a news paragraph and I will explain why it may be fake, misleading, or AI-generated."
      }],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [newsImage, setNewsImage] = useState(null);
  const [headline, setHeadline] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 🔥 Fetch Live News (Image + Headline)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/top-headlines?country=in&pageSize=1&apiKey=31f410f69a7e45ea9c62e24faa7b1993"
        );

        const article = response.data.articles[0];
        setHeadline(article.title);
        setNewsImage(article.urlToImage);
      } catch (error) {
        console.error("News fetch error:", error);
      }
    };

    fetchNews();
  }, []);

  const onSubmit = async (data) => {
    if (!data.message) return;

    const newMessage = { role: "user", parts: [{ text: data.message }] };
    setMessages(prev => [...prev, newMessage]);
    reset();
    setLoading(true);

    try {
      const response = await axios.post(
        "YOUR_BACKEND_API_ENDPOINT",
        { message: data.message },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response.data.message || "No response generated." }],
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "Editorial system encountered an issue." }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-offwhite min-h-screen px-4 md:px-10 py-10">

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">

        {/* 🔵 LEFT — NEWS IMAGE PANEL */}
        <div className="relative rounded-lg overflow-hidden shadow-xl border border-charcoal">

          {newsImage && (
            <img
              src={newsImage}
              alt="Live News"
              className="w-full h-full object-cover min-h-[400px]"
            />
          )}

          {/* Navy Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/90 via-[#0f172a]/50 to-transparent"></div>

          {/* Headline Overlay */}
          <div className="absolute bottom-0 p-6 text-white">
            <h2 className="font-heading text-2xl md:text-3xl leading-snug">
              {headline}
            </h2>

            <div className="w-24 h-[3px] bg-newsred mt-4"></div>

            <p className="text-sm mt-4 opacity-80">
              Live headline pulled from real-time news feed.
            </p>
          </div>

        </div>

        {/* 🔴 RIGHT — CHATBOT */}
        <div className="border border-charcoal shadow-lg flex flex-col h-[80vh] rounded-lg overflow-hidden bg-white">

          {/* HEADER */}
          <div className="bg-[#0f172a] text-white px-6 py-4">
            <h2 className="font-heading text-2xl uppercase tracking-widest">
              Pramaan AI
            </h2>
            <p className="text-sm opacity-80 mt-1">
              Editorial Explanation Engine
            </p>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-offwhite">

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 max-w-[80%] text-sm md:text-base rounded-md shadow-sm
                    ${
                      msg.role === "user"
                        ? "bg-newsred text-white"
                        : "bg-[#e2e8f0] border-l-4 border-[#0f172a] text-charcoal"
                    }`}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-[#e2e8f0] border-l-4 border-[#0f172a] rounded-md">
                  Analyzing credibility...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-t border-charcoal flex p-3 bg-white gap-2"
          >
            <input
              {...register("message", { required: true })}
              className="flex-1 p-3 border border-charcoal rounded-md focus:outline-none focus:ring-2 focus:ring-newsred"
              placeholder="Ask why this news might be fake..."
            />

            <button
              type="submit"
              className="bg-[#0f172a] text-white px-5 py-3 rounded-md hover:bg-[#1e293b] transition"
            >
              Send
            </button>
          </form>

          {errors.message && (
            <p className="text-newsred text-sm px-4 pb-2">
              Please enter text for analysis.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Pramaan;