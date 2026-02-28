import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const NewsSection = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Backend URL
  const backendUrl = "https://no-fake-samacharbackend.onrender.com";

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/news`, {
        params: { country: "us", category: "technology" },
      });
      setArticles(response.data.articles || []);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col items-center mt-24">
      <h3 className="text-xl md:text-2xl font-heading tracking-widest mb-6 text-charcoal">
        Explore Our News Bulletin & Inshorts
      </h3>

      {loading && <p className="text-charcoal text-sm">Loading news...</p>}

      {!loading && articles.length > 0 && (
        <div className="flex flex-wrap gap-8 justify-center">
          {articles.slice(0, 4).map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-center w-48"
            >
              <div className="overflow-hidden rounded-xl shadow-xl">
                <img
                  src={article.urlToImage || "https://via.placeholder.com/200"}
                  alt={article.title}
                  className="w-48 h-48 object-cover transition duration-500 group-hover:blur-sm"
                />
              </div>
              <p className="mt-3 font-semibold tracking-wide text-charcoal group-hover:text-black transition">
                {article.title.length > 40
                  ? article.title.slice(0, 40) + "..."
                  : article.title}
              </p>
            </a>
          ))}
        </div>
      )}

      {!loading && articles.length === 0 && (
        <p className="text-charcoal text-sm mt-4">No news available.</p>
      )}
    </div>
  );
};

export default NewsSection;