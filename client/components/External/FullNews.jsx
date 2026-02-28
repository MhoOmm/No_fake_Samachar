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
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=5ca44e06899247f18e6ec93a74b9870b`
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
    <div className="min-h-screen bg-offwhite">

      {/* Filter Controls - Newspaper Style */}
      <div className="bg-charcoal text-offwhite border-b border-charcoal/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-wider font-semibold">
                Edition:
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="px-4 py-2 bg-offwhite text-charcoal border border-charcoal/20 text-sm font-medium focus:outline-none focus:border-charcoal"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div className="h-6 w-px bg-offwhite/30"></div>

            <div className="flex items-center gap-2">
              <label className="text-xs uppercase tracking-wider font-semibold">
                Section:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 bg-offwhite text-charcoal border border-charcoal/20 text-sm font-medium focus:outline-none focus:border-charcoal"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={fetchFullNews}
              className="px-6 py-2 bg-offwhite text-charcoal text-xs uppercase tracking-widest font-bold border-2 border-offwhite hover:bg-transparent hover:text-offwhite transition-all duration-300"
            >
              Refresh Edition
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block">
              <div className="w-16 h-16 border-4 border-charcoal border-t-transparent rounded-full animate-spin"></div>
              <p className="text-charcoal text-sm uppercase tracking-wider mt-4 font-semibold">
                Loading Latest Edition...
              </p>
            </div>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-charcoal/60 text-lg font-header">
              No articles found for this section.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {articles[0] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16 border-b-2 border-charcoal pb-12"
              >
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative overflow-hidden bg-charcoal/5">
                    <img
                      src={
                        articles[0].urlToImage ||
                        "https://via.placeholder.com/800x600?text=No+Image"
                      }
                      alt={articles[0].title}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs uppercase tracking-widest text-charcoal/60 mb-3 font-bold">
                      Featured Story
                    </div>
                    <h2 className="font-header text-4xl md:text-5xl leading-tight mb-4 text-charcoal">
                      {articles[0].title}
                    </h2>
                    <p className="text-charcoal/80 text-lg leading-relaxed mb-4 font-serif">
                      {articles[0].description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-charcoal/60 mb-6">
                      <span className="uppercase tracking-wider">
                        {articles[0].source.name}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(articles[0].publishedAt).toLocaleDateString()}
                      </span>
                      {articles[0].author && (
                        <>
                          <span>•</span>
                          <span>By {articles[0].author}</span>
                        </>
                      )}
                    </div>
                    <a
                      href={articles[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 bg-charcoal text-offwhite text-xs uppercase tracking-widest font-bold hover:bg-charcoal/90 transition-colors duration-300 w-fit"
                    >
                      Read Full Story →
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Articles Grid */}
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {articles.slice(1).map((article, idx) => (
                <motion.article
                  key={idx}
                  className="border-b-2 border-charcoal/10 pb-8 group cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative overflow-hidden bg-charcoal/5 mb-4">
                    <img
                      src={
                        article.urlToImage ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={article.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-charcoal/60 font-bold">
                      <span>{article.source.name}</span>
                      <span>•</span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-header text-xl leading-tight text-charcoal group-hover:text-charcoal/70 transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm text-charcoal/70 leading-relaxed line-clamp-3">
                      {article.description}
                    </p>

                    {article.author && (
                      <p className="text-xs text-charcoal/50 italic">
                        By {article.author}
                      </p>
                    )}

                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs uppercase tracking-widest font-bold text-charcoal hover:underline decoration-2 underline-offset-4 transition-all"
                    >
                      Continue Reading →
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-charcoal text-offwhite border-t-4 border-charcoal mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center">
          <p className="text-xs uppercase tracking-widest text-offwhite/60">
            © {new Date().getFullYear()} The Daily Chronicle • All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullNews;