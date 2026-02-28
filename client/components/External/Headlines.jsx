import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_KEY = "31f410f69a7e45ea9c62e24faa7b1993";

const countries = [
  { code: "in", name: "India" },
  { code: "us", name: "USA" },
  { code: "gb", name: "UK" },
  { code: "au", name: "Australia" },
];

const categories = [
  "general",
  "business",
  "technology",
  "sports",
  "health",
  "science",
  "entertainment",
];

export default function Headlines() {
  const [country, setCountry] = useState("in");
  const [category, setCategory] = useState("general");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=${API_KEY}`
      );

      setArticles(res.data.articles || []);
    } catch (err) {
      alert("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col">

      {/* Top controls */}
      <div className="p-4 flex gap-3 justify-center border-b">

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border px-3 py-1 rounded"
        >
          {countries.map(c =>
            <option key={c.code} value={c.code}>{c.name}</option>
          )}
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-1 rounded capitalize"
        >
          {categories.map(cat =>
            <option key={cat}>{cat}</option>
          )}
        </select>

        <button
          onClick={fetchNews}
          className="bg-black text-white px-7 py-2 rounded-2xl"
        >
          Search
        </button>

      </div>

      {loading && (
        <p className="text-center mt-4">Loading...</p>
      )}

      {/* Shorts container */}
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory">

        {articles.map((article, i) => (

          <div
            key={i}
            className="snap-start h-full flex items-center justify-center p-4"
          >

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black text-white w-full max-w-md h-[85vh] rounded-xl overflow-hidden flex flex-col"
            >

              {/* Image */}
              <div className="h-1/2">
                <img
                  src={
                    article.urlToImage ||
                    "https://via.placeholder.com/600x400"
                  }
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">

                <p className="text-sm text-gray-400 mb-2">
                  {article.source?.name}
                </p>

                <h2 className="text-4xl font-semibold mb-3">
                  {article.title}
                </h2>

                <p className="text-gray-300 text-lg flex-1 overflow-auto">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-center border border-white py-2 rounded hover:bg-white hover:text-black transition"
                >
                  Read full news
                </a>

              </div>

            </motion.div>

          </div>

        ))}

      </div>

    </div>
  );
}