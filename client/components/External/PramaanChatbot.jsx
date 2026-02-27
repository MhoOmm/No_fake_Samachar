import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Pramaan = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [
        {
          text: "Welcome to Pramaan AI. Paste a news paragraph and I will explain why it may be fake, misleading, or AI-generated.",
        },
      ],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newsLoading, setNewsLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  // Scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ===============================
  // 🔵 FETCH NEWS
  // ===============================
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&pageSize=5&apiKey=31f410f69a7e45ea9c62e24faa7b1993"
        );

        const validArticles = response.data.articles.filter(
          (article) => article.urlToImage
        );

        setArticles(validArticles);
      } catch (error) {
        console.error("News fetch error:", error);

        // fallback demo content
        setArticles([
          {
            title: "Live News Unavailable",
            urlToImage:
              "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
          },
        ]);
      } finally {
        setNewsLoading(false);
      }
    };

    fetchNews();
  }, []);


  useEffect(() => {
    if (articles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === articles.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [articles]);


  const onSubmit = async (data) => {
    if (!data.message) return;

    const newMessage = { role: "user", parts: [{ text: data.message }] };
    setMessages((prev) => [...prev, newMessage]);
    reset();
    setLoading(true);

    try {
      const response = await axios.post(
        "YOUR_BACKEND_API_ENDPOINT",
        { message: data.message }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [
            { text: response.data.message || "No explanation generated." },
          ],
        },
      ]);
    } catch {
      setMessages((prev) => [
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
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* ================= LEFT — BIG ROTATING NEWS PANEL ================= */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-charcoal min-h-[500px]">

          {newsLoading ? (
            <div className="flex items-center justify-center h-full bg-[#0f172a] text-white text-xl">
              Loading Live News...
            </div>
          ) : (
            <>
              <img
                src={articles[currentIndex]?.urlToImage}
                alt="Live News"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />

              {/* Navy Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/60 to-transparent"></div>

              {/* Headline */}
              <div className="absolute bottom-0 p-8 text-white">
                <h2 className="font-heading text-3xl md:text-4xl leading-snug">
                  {articles[currentIndex]?.title}
                </h2>

                <div className="w-24 h-[4px] bg-newsred mt-4"></div>

                <p className="text-sm mt-4 opacity-80">
                  Rotating real-time headlines • Updates every 5 seconds
                </p>
              </div>
            </>
          )}
        </div>

        {/* ================= RIGHT — CHATBOT ================= */}
        <div className="border border-charcoal shadow-2xl flex flex-col h-[80vh] rounded-2xl overflow-hidden bg-white">

          <div className="bg-[#0f172a] text-white px-6 py-4">
            <h2 className="font-heading text-2xl uppercase tracking-widest">
              Pramaan AI
            </h2>
            <p className="text-sm opacity-80 mt-1">
              AI News Credibility Engine
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-offwhite">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-3 max-w-[80%] text-sm md:text-base rounded-lg shadow-sm
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
                <div className="px-4 py-3 bg-[#e2e8f0] border-l-4 border-[#0f172a] rounded-lg">
                  Analyzing credibility...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-t border-charcoal flex p-3 bg-white gap-2"
          >
            <input
              {...register("message", { required: true })}
              className="flex-1 p-3 border border-charcoal rounded-lg focus:outline-none focus:ring-2 focus:ring-newsred"
              placeholder="Ask why this news might be fake..."
            />

            <button
              type="submit"
              className="bg-[#0f172a] text-white px-5 py-3 rounded-lg hover:bg-[#1e293b] transition"
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