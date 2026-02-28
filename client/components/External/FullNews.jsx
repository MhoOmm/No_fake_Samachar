// FullNews.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const countries = ["us", "in", "gb", "au", "ca"];
const categories = ["business", "entertainment", "general", "health", "science", "sports", "technology"];

const FullNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("general");

  const fetchFullNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=31f410f69a7e45ea9c62e24faa7b1993`
      );
      setArticles(response.data.articles);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFullNews();
  }, [country, category]);

  return (
    <div className="p-6 min-h-screen bg-offwhite">
      <h2 className="text-4xl font-header text-center text-offwhite mb-6 text-charcoal">🌎 Full News Dashboard</h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c.toUpperCase()}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={fetchFullNews}
          className="px-4 py-2 bg-charcoal text-offwhite rounded-lg hover:bg-gray-800 transition"
        >
          Fetch News
        </button>
      </div>

      {/* News Grid */}
      {loading ? (
        <p className="text-charcoal text-center text-lg">Loading news...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              className="bg-charcoal rounded-2xl shadow-xl overflow-hidden flex flex-col h-full text-white"
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,0,0,0.5)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <img
                src={article.urlToImage || "https://via.placeholder.com/600x400"}
                alt={article.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow gap-3">
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Source:</span> {article.source.name || "Unknown"} (
                  {article.source.id || "N/A"})
                </p>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold">Author:</span> {article.author || "Unknown"}
                </p>
                <h3 className="font-semibold text-xl">{article.title}</h3>
                <p className="text-gray-200">{article.description}</p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold">Published At:</span>{" "}
                  {new Date(article.publishedAt).toLocaleString()}
                </p>
                <p className="text-gray-200 text-sm">{article.content}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto py-3 text-center bg-offwhite text-charcoal font-semibold rounded-xl hover:bg-gray-200 transition"
                >
                  Read Full Article
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default FullNews;