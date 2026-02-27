// TruthDeskChat.jsx

import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Pramaan = () => {
  const [messages, setMessages] = useState([
    {
      role: "model",
      parts: [{ text: "Welcome to Pramaan AI. Paste a news paragraph and I will explain why it may be fake, misleading, or AI-generated." }],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: response.data.message || "No response generated." }],
        },
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: "model",
          parts: [{ text: "Editorial system encountered an issue. Please try again." }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-offwhite min-h-screen flex flex-col items-center px-4 md:px-10 py-10">

      {/* CHAT CONTAINER */}
      <div className="w-full max-w-4xl border border-charcoal shadow-lg flex flex-col h-[80vh] rounded-md overflow-hidden">

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
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-3 max-w-[85%] md:max-w-[70%] text-sm md:text-base leading-relaxed rounded-md shadow-sm
                ${
                  msg.role === "user"
                    ? "bg-newsred text-white"
                    : "bg-[#e2e8f0] text-charcoal border-l-4 border-[#0f172a]"
                }`}
              >
                {msg.parts[0].text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-3 bg-[#e2e8f0] border-l-4 border-[#0f172a] text-charcoal rounded-md">
                Analyzing content...
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
            {...register("message", { required: true, minLength: 1 })}
            className="flex-1 p-3 border border-charcoal rounded-md focus:outline-none focus:ring-2 focus:ring-newsred text-sm md:text-base"
            placeholder="Paste news text or ask why it may be fake..."
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
            Please enter some text for analysis.
          </p>
        )}
      </div>

    </div>
  );
};

export default Pramaan;