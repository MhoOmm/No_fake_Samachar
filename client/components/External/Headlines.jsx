import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Headlines = () => {
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchNews = async () => {
    setLoading(true);
    try {
      // Try top-headlines first
      let response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=5ca44e06899247f18e6ec93a74b9870b`
      );
      
      console.log("Top headlines response:", response.data);
      
      // If no articles, try 'everything' endpoint as fallback
      if (!response.data.articles || response.data.articles.length === 0) {
        console.log("No articles from top-headlines, trying everything endpoint...");
        response = await axios.get(
          `https://newsapi.org/v2/everything?q=${category}&language=en&sortBy=publishedAt&pageSize=10&apiKey=5ca44e06899247f18e6ec93a74b9870b`
        );
        console.log("Everything endpoint response:", response.data);
      }
      
      setArticles(response.data.articles || []);
      setCurrentIndex(0);
      console.log("Final articles set:", response.data.articles?.length || 0);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleScroll = (e) => {
    const container = e.target;
    const scrollPosition = container.scrollTop;
    const windowHeight = container.clientHeight;
    const index = Math.round(scrollPosition / windowHeight);
    setCurrentIndex(index);
  };

  return (
    <div className="h-screen flex flex-col bg-offwhite">
      {/* Newspaper Header */}
      <div className="bg-charcoal text-offwhite border-b-4 border-charcoal">
        {/* Controls */}
        <div className="px-4 pb-5">
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <div className="flex items-center gap-2  ">
              <label className="text-[10px] uppercase tracking-widest font-bold">
                Edition:
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="px-3 py-2 bg-offwhite text-charcoal border border-charcoal/20 text-sm font-medium outline-none"
              >
                <option value="us">USA</option>
                <option value="gb">UK</option>
                <option value="au">Australia</option>
                <option value="in">India</option>
              </select>
            </div>

            <div className="h-5 w-px bg-offwhite/30"></div>

            <div className="flex items-center gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold">
                Topic:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 bg-offwhite text-charcoal border border-charcoal/20 text-sm font-medium capitalize outline-none"
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
              className="px-6 py-2 bg-offwhite text-charcoal text-[10px] uppercase tracking-widest font-bold border-2 border-offwhite hover:bg-transparent hover:text-offwhite transition-all duration-300 cursor-pointer"
            >
              Load Stories
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-offwhite z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-charcoal border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-charcoal text-xs uppercase tracking-widest font-bold">
                Fetching Latest Briefs...
              </p>
            </div>
          </div>
        )}

        {!loading && articles.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-offwhite">
            <div className="text-center px-6">
              <p className="font-header text-2xl text-charcoal/60 mb-2">
                No Stories Available
              </p>
              <p className="text-sm text-charcoal/40 uppercase tracking-wider">
                Try USA + Technology for best results
              </p>
            </div>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div 
            className="h-full overflow-y-auto snap-y snap-mandatory"
            onScroll={handleScroll}
          >
            {articles.map((article, i) => (
              <div
                key={i}
                className="h-screen snap-start flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-charcoal text-offwhite w-full max-w-md h-[85vh] border-8 border-charcoal shadow-2xl overflow-hidden flex flex-col"
                >
                  {/* Image Section */}
                  <div className="relative h-[45%] border-b-4 border-offwhite/20">
                    {article.urlToImage ? (
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400/2B2B2B/F0F0F0?text=No+Image";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-charcoal/30 flex items-center justify-center">
                        <span className="text-offwhite/30 text-sm uppercase tracking-widest">
                          No Image
                        </span>
                      </div>
                    )}
                    {/* Story Badge */}
                    <div className="absolute top-4 left-4 bg-offwhite text-white px-3 py-1 text-xs font-bold tracking-widest">
                      STORY {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 p-6 flex flex-col overflow-hidden">
                    {/* Source and Date */}
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-offwhite/60 mb-4 pb-3 border-b border-offwhite/10">
                      <span className="font-bold">
                        {article.source?.name || "Unknown Source"}
                      </span>
                      <span>
                        {new Date(article.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-header text-2xl sm:text-3xl leading-tight mb-4 text-offwhite">
                      {article.title}
                    </h2>

                    {/* Description */}
                    <div className="flex-1 overflow-y-auto mb-4">
                      <p className="text-offwhite/90 text-base leading-relaxed">
                        {article.description || "No description available for this article."}
                      </p>
                      
                      {article.author && (
                        <p className="text-offwhite/50 text-sm italic mt-3">
                          — {article.author}
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto text-center bg-offwhite text-charcoal py-3 text-xs uppercase tracking-widest font-bold hover:bg-offwhite/90 transition-all duration-300 block no-underline"
                    >
                      Read Full Article →
                    </a>
                  </div>

                  {/* Bottom Decoration */}
                  <div className="h-2 bg-offwhite/10"></div>
                </motion.div>
              </div>
            ))}
          </div>
          
        )}

        {/* Scroll Indicator */}
        {!loading && articles.length > 0 && currentIndex < articles.length - 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <div className="bg-charcoal/90 text-offwhite px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm border border-offwhite/20">
              Scroll for More ↓
            </div>
          </div>
        )}

        {/* Story Counter */}
        {!loading && articles.length > 0 && (
          <div className="absolute top-4 right-4 bg-charcoal/90 text-offwhite px-3 py-2 rounded-full text-xs font-bold backdrop-blur-sm border border-offwhite/20 z-20">
            {currentIndex + 1} / {articles.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default Headlines;