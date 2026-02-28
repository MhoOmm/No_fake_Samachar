import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("technology");
  const [error, setError] = useState("");

  // Backend URL
  const backendUrl = "https://no-fake-samacharbackend.onrender.com"; // replace with your deployed backend

  const fetchNews = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${backendUrl}/api/news`, {
        params: { country, category },
      });

      if (!response.data.articles || response.data.articles.length === 0) {
        setError("No news articles available for this selection.");
        setArticles([]);
      } else {
        setArticles(response.data.articles);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
      setError("Failed to fetch news. Please try again later.");
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, [country, category]); // refetch when country/category changes

  return (
    <div className="flex flex-col items-center mt-24 px-4">
      <h3 className="text-xl md:text-2xl font-heading tracking-widest mb-6 text-charcoal">
        Explore Our News Bulletin & Inshorts
      </h3>

      {/* Country & Category Selectors */}
      <div className="flex gap-4 mb-6 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold uppercase tracking-widest">
            Country:
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded"
          >
            <option value="us">USA</option>
            <option value="gb">UK</option>
            <option value="au">Australia</option>
            <option value="in">India</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold uppercase tracking-widest">
            Category:
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded capitalize"
          >
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
            <option value="science">Science</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            <option value="general">General</option>
          </select>
        </div>

        <button
          onClick={fetchNews}
          className="px-4 py-2 bg-charcoal text-offwhite uppercase text-xs tracking-widest font-bold rounded hover:bg-gray-800 transition"
        >
          Load News
        </button>
      </div>

      {/* Loading */}
      {loading && <p className="text-charcoal text-sm mb-4">Loading news...</p>}

      {/* Error */}
      {!loading && error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {/* News Articles */}
      {!loading && articles.length > 0 && (
        <div className="flex flex-wrap gap-8 justify-center">
          {articles.slice(0, 8).map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center w-48"
            >
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={
                    article.urlToImage ||
                    "https://via.placeholder.com/200?text=No+Image"
                  }
                  alt={article.title}
                  className="w-48 h-48 object-cover transition duration-500 group-hover:blur-sm"
                />
              </div>
              <p className="mt-3 font-semibold tracking-wide text-charcoal group-hover:text-black transition">
                {article.title.length > 60
                  ? article.title.slice(0, 60) + "..."
                  : article.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {article.source?.name || "Unknown"}
              </p>
            </a>
          ))}
        </div>
      )}

      {/* No articles */}
      {!loading && articles.length === 0 && !error && (
        <p className="text-charcoal text-sm mt-4">
          No news available for this selection.
        </p>
      )}
    </div>
  );
};

export default NewsSection;