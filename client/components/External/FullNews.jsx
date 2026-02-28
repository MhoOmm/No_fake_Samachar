// FullNews.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const countries = ["us", "in", "gb", "au", "ca"];
const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const FullNews = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("general");

  const fetchFullNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=YOUR_API_KEY`
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
    <div className="p-10 min-h-screen bg-offwhite text-black">
      
      {/* Heading */}
      <h2 className="text-4xl font-heading text-center mb-8 uppercase tracking-widest text-navy">
        Full News Dashboard
      </h2>

      <div className="w-24 h-[2px] bg-navy mx-auto mb-10"></div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="px-4 py-2 border border-navy rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-navy"
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
          className="px-4 py-2 border border-navy rounded-md bg-white text-black focus:outline-none focus:ring-1 focus:ring-navy"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={fetchFullNews}
          className="px-6 py-2 bg-blblack rounded-md hover:bg-navy transition"
        >
          Fetch News
        </button>
      </div>

      {/* News Grid */}
      {loading ? (
        <p className="text-center text-navy text-lg">Loading news...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {articles.map((article, idx) => (
            <motion.div
              key={idx}
              className="bg-navy text-black rounded-xl shadow-lg overflow-hidden flex flex-col"
              whileHover={{
                scale: 1.03,
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <img
                src={
                  article.urlToImage ||
                  "https://via.placeholder.com/600x400"
                }
                alt={article.title}
                className="w-full h-64 object-cover"
              />

              <div className="p-6 flex flex-col gap-3 flex-grow">

                <p className="text-sm text-black/70">
                  <span className="font-semibold">Source:</span>{" "}
                  {article.source.name || "Unknown"}
                </p>

                <p className="text-sm text-black/70">
                  <span className="font-semibold">Author:</span>{" "}
                  {article.author || "Unknown"}
                </p>

                <h3 className="text-xl font-semibold leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-black/80">
                  {article.description}
                </p>

                <p className="text-xs text-black/60">
                  {new Date(article.publishedAt).toLocaleString()}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto py-3 text-center bg-black text-white rounded-md hover:bg-white hover:text-navy transition"
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