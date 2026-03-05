import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Headlines = () => {
  const [country, setCountry] = useState("us");
  const [category, setCategory] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Backend URL
  const backendUrl = "https://no-fake-samacharbackend.onrender.com";

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/news`, {
        params: { country, category },
      });

      setArticles(response.data.articles || []);
      setCurrentIndex(0);
    } catch (err) {
      console.error("Error fetching news:", err);
      setArticles([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Navigation functions
  const goToNext = () => {
    if (currentIndex < articles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, articles.length]);

  // Touch/Swipe handling
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe up
      goToNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe down
      goToPrev();
    }
  };

  // Mouse wheel navigation
  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      goToNext();
    } else {
      goToPrev();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-offwhite">
      {/* Header */}
      <div className="bg-charcoal text-offwhite border-b-4 border-charcoal">
        <div className="px-4 pb-5">
          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <div className="flex items-center gap-2">
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

      {/* Main Content */}
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
            className="h-full flex items-center justify-center p-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="bg-charcoal text-offwhite w-full max-w-md h-[85vh] border-8 border-charcoal shadow-2xl overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative h-[45%] border-b-4 border-offwhite/20">
                  {articles[currentIndex].urlToImage ? (
                    <img
                      src={articles[currentIndex].urlToImage}
                      alt={articles[currentIndex].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/600x400/2B2B2B/F0F0F0?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-charcoal/30 flex items-center justify-center">
                      <span className="text-offwhite/30 text-sm uppercase tracking-widest">
                        No Image
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-offwhite text-white px-3 py-1 text-xs font-bold tracking-widest">
                    STORY {String(currentIndex + 1).padStart(2, "0")}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col overflow-hidden">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-offwhite/60 mb-4 pb-3 border-b border-offwhite/10">
                    <span className="font-bold">
                      {articles[currentIndex].source?.name || "Unknown Source"}
                    </span>
                    <span>
                      {new Date(articles[currentIndex].publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <h2 className="font-header text-2xl sm:text-3xl leading-tight mb-4 text-offwhite">
                    {articles[currentIndex].title}
                  </h2>

                  <div className="flex-1 overflow-y-auto mb-4">
                    <p className="text-offwhite/90 text-base leading-relaxed">
                      {articles[currentIndex].description ||
                        "No description available for this article."}
                    </p>
                    {articles[currentIndex].author && (
                      <p className="text-offwhite/50 text-sm italic mt-3">
                        — {articles[currentIndex].author}
                      </p>
                    )}
                  </div>

                  <a
                    href={articles[currentIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto text-center bg-offwhite text-charcoal py-3 text-xs uppercase tracking-widest font-bold hover:bg-offwhite/90 transition-all duration-300 block no-underline"
                  >
                    Read Full Article →
                  </a>
                </div>

                <div className="h-2 bg-offwhite/10"></div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Navigation Arrows */}
        {!loading && articles.length > 0 && (
          <>
            {/* Previous Arrow */}
            {currentIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-charcoal/90 text-offwhite p-4 rounded-full hover:bg-charcoal transition-all z-20 backdrop-blur-sm border border-offwhite/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            )}

            {/* Next Arrow */}
            {currentIndex < articles.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-charcoal/90 text-offwhite p-4 rounded-full hover:bg-charcoal transition-all z-20 backdrop-blur-sm border border-offwhite/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </>
        )}

        {/* Counter */}
        {!loading && articles.length > 0 && (
          <div className="absolute top-4 right-4 bg-charcoal/90 text-offwhite px-3 py-2 rounded-full text-xs font-bold backdrop-blur-sm border border-offwhite/20 z-20">
            {currentIndex + 1} / {articles.length}
          </div>
        )}

        {/* Instructions */}
        {!loading && articles.length > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-20">
            <div className="bg-charcoal/90 text-offwhite px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold backdrop-blur-sm border border-offwhite/20">
              Swipe • Arrows • Scroll
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Headlines;