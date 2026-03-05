import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import hands from "../../assets/rename.jpeg";

const Hand = () => {

  /* LEFT TEXT ROTATION */
  const leftTexts = [
    "Unbiased AI for News Verification",
    "Click Me",
  ];

  const [leftIndex, setLeftIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftIndex((prev) => (prev + 1) % leftTexts.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  /* RIGHT TEXT ROTATION */
  const rightTexts = [
    "Explaining the Truth Behind Every Verdict.",
    "Click Me ",
  ];

  const [rightIndex, setRightIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRightIndex((prev) => (prev + 1) % rightTexts.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative w-full min-h-screen bg-gradient-to-b from-white via-offwhite to-white overflow-hidden flex items-center justify-center">

        {/* BACKGROUND IMAGE */}
        <img
          src={hands}
          alt="Human and AI"
          className="absolute inset-0 w-full h-full object-contain -translate-y-5 pointer-events-none"
        />

        {/* RESPONSIVE CONTAINER - Flex on mobile, absolute positioning on desktop */}
        <div className="flex flex-col md:block w-full h-full items-center justify-center gap-54 md:gap-0 px-4 md:px-0 z-20 md:z-0">
          
          {/* ================= LEFT - Nishpaksh ================= */}
          <NavLink
            to="/chatbot"
            className="md:absolute md:left-10 lg:left-16 md:top-1/2 md:-translate-y-80 group w-full max-w-md md:max-w-none md:w-auto -translate-x-4 sm:-translate-x-25 md:translate-x-0"
          >
            <motion.div
              whileHover={{ x: -12 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-6 py-5 rounded-2xl transition-all duration-500 group-hover:bg-black  md:bg-transparent md:backdrop-blur-none"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold group-hover:text-white transition">
                Nishpaksh
              </h2>

              <AnimatePresence mode="wait">
                <motion.p
                  key={leftTexts[leftIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="text-newsred text-lg md:text-lg lg:text-xl font-semibold mt-2 group-hover:text-white"
                >
                  {leftTexts[leftIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </NavLink>

          {/* ================= RIGHT - Pramaan ================= */}
          <NavLink
            to="/pramaanchatbot"
            className="md:absolute md:right-10 lg:right-16 md:top-1/2 md:-translate-y-76 group w-full max-w-md md:max-w-none md:w-auto translate-x-4 sm:translate-x-51 md:translate-x-0"
          >
            <motion.div
              whileHover={{ y: 12 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="px-6 py-5 rounded-2xl md:text-right transition-all duration-500 group-hover:bg-black  md:bg-transparent md:backdrop-blur-none"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold group-hover:text-white transition">
                Pramaan
              </h2>

              <AnimatePresence mode="wait">
                <motion.p
                  key={rightTexts[rightIndex]}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5 }}
                  className="text-newsred text-lg md:text-lg lg:text-xl font-semibold mt-2 group-hover:text-white"
                >
                  {rightTexts[rightIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          </NavLink>
        </div>

      </section>
 
      {/* MODE BUTTONS */}
      <div className="w-full flex justify-center mb-12 sm:mb-16 px-4">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-4xl">
          {/* ===== FullStory Button ===== */}
          <NavLink to="/fullnews" className="flex-1">
            <button className="w-full py-6 sm:py-8 px-8 sm:px-12 lg:px-16 text-xl sm:text-2xl lg:text-3xl font-bold rounded-2xl border-2 border-black bg-white text-black-700 hover:bg-newsred hover:text-white hover:bg-black transition-all duration-300 shadow-sm">
              FullStory
            </button>
          </NavLink>

          {/* ===== Bulletins Button ===== */}
          <NavLink to="/headlines" className="flex-1">
            <button className="w-full py-6 sm:py-8 px-8 sm:px-12 lg:px-16 text-xl sm:text-2xl lg:text-3xl font-bold rounded-2xl border-2 border-black bg-white text-black-700 hover:bg-newsred hover:text-white hover:bg-black transition-all duration-300 shadow-sm">
              Bulletins
            </button>
          </NavLink>
        </div>
      </div>


      {/* ABOUT US SECTION */}
      <section className="w-full bg-gradient-to-b from-white via-offwhite to-white py-16 sm:py-20 flex flex-col items-center text-center px-4">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-newsred mb-4 sm:mb-6">
          WANNA KNOW HOW WE WORK?
        </h2>

        {/* Optional Description */}
        <p className="max-w-2xl text-[#2B2B2B] text-base sm:text-lg md:text-xl mb-8 sm:mb-10 px-4">
          Discover our process and how we make things happen efficiently.  
          From ideation to execution, transparency and innovation are at the core.
        </p>

        {/* NavLink Button */}
        <NavLink to="/about">
          <button className="py-4 sm:py-5 px-10 sm:px-14 text-xl sm:text-2xl font-semibold rounded-2xl border-2 border-newsred bg-white text-newsred hover:bg-black hover:text-white transition-all duration-300 shadow-md">
            Learn More
          </button>
        </NavLink>
      </section>


      {/* ================= BLACK FOOTER ================= */}
      <footer className="bg-black text-white py-8 sm:py-10 text-center px-4">
        <h3 className="text-lg sm:text-xl font-heading tracking-widest uppercase">
          NO FAKE समाचार
        </h3>

        <p className="mt-4 text-xs sm:text-sm opacity-70">
          Made with logic, built with AI, driven by truth.
        </p>

        <div className="w-24 h-[2px] bg-newsred mx-auto mt-6"></div>

        <p className="mt-6 text-xs opacity-50 tracking-widest">
          DIGITAL TRUST SYSTEM • © {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
};

export default Hand;