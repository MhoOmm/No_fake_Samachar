import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.jpeg";

const Heading = () => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // System Messages (Right → Left)
  const systemMessages = [
    "Full Story : Detailed coverage of the complete news report.",
    "Bulletins : Brief updates covering the key headlines.",
    "NO FAKE समाचार — where every headline is verified before it reaches you.",
  ];

  // Backend URL
  const backendUrl = "https://no-fake-samacharbackend.onrender.com";

  // Fetch Real News (Left → Right)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/news`, {
          params: { country: "in", category: "general" },
        });

        const news = (response.data.articles || []).map((article) => ({
          title: article.title,
          url: article.url,
        }));

        setHeadlines(news);
      } catch (error) {
        console.error("Error fetching news:", error);
        setHeadlines([
          {
            title: "LIVE UPDATE • Unable to fetch headlines",
            url: "#",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <header className="bg-offwhite text-charcoal border-b-4 border-charcoal">

      {/* 🔹 TOP THIN SYSTEM TICKER (RIGHT → LEFT) */}
      <div className="bg-black overflow-hidden whitespace-nowrap border-b border-charcoal">
        <div className="ticker-rtl flex items-center py-2">
          {[...systemMessages, ...systemMessages].map((msg, index) => (
            <span
              key={index}
              className="text-white text-sm mx-8 tracking-widest uppercase"
            >
              {msg}
              <span className="text-newsred mx-6"> ● </span>
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 TOP INFO BAR */}
      <div className="flex justify-between px-6 md:px-12 py-2 text-xs tracking-widest border-b border-charcoal/40">
        <span>NO FAKE समाचार • DIGITAL EDITION</span>
        <span>{today}</span>
      </div>

      {/* 🔹 MASTHEAD */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-6">
        <div className="mb-3 md:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </div>

        <div className="text-center flex-1">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.2em] uppercase">
            NO FAKE समाचार
          </h1>

          <p className="text-newsred text-lg sm:text-xl md:text-2xl font-semibold tracking-wide mt-3 uppercase">
            Verify Before You Believe
          </p>

          <div className="w-40 h-[2px] bg-newsred mx-auto mt-4"></div>
        </div>

        <div className="hidden md:block w-20"></div>
      </div>

      {/* 🔹 NEWS HEADLINES TICKER (LEFT → RIGHT) */}
      <div className="bg-black overflow-hidden relative border-t border-charcoal">
        <div className="pl-24">
          <div className="ticker-ltr flex items-center py-6">
            {!loading &&
              [...headlines, ...headlines].map((headline, index) => (
                <a
                  key={index}
                  href={headline.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-lg md:text-xl mx-12 tracking-wide uppercase"
                >
                  {headline.title}
                  <span className="text-newsred mx-8"> ● </span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Heading;