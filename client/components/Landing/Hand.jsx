import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import hands from "../../assets/rename.jpeg";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";

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
      <section className="relative w-full h-screen bg-gradient-to-b from-white via-offwhite to-white overflow-hidden flex items-center justify-center">

        {/* BACKGROUND IMAGE */}
        <img
          src={hands}
          alt="Human and AI"
          className="absolute inset-0 w-full h-full object-contain -translate-y-5 pointer-events-none"
        />


        {/* ================= LEFT ================= */}
        <NavLink
          to="/validator"
          className="absolute left-6 md:left-16 top-1/2 -translate-y-80 group z-10"
        >
          <motion.div
            whileHover={{ x: -12 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-5 rounded-2xl transition-all duration-500 group-hover:bg-black"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold group-hover:text-white transition">
              Nishpaksh
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={leftTexts[leftIndex]}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-newsred text-xl font-semibold mt-2 group-hover:text-white"
              >
                {leftTexts[leftIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </NavLink>

        {/* ================= RIGHT ================= */}
        <NavLink
          to="/pramaanchatbot"
          className="absolute right-6 md:right-16 top-1/2 -translate-y-76 group z-10"
        >
          <motion.div
            whileHover={{ y: 12 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="px-6 py-5 rounded-2xl text-right transition-all duration-500 group-hover:bg-black"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold group-hover:text-white transition">
              Pramaan
            </h2>

            <AnimatePresence mode="wait">
              <motion.p
                key={rightTexts[rightIndex]}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="text-newsred text-xl font-semibold mt-2 group-hover:text-white"
              >
                {rightTexts[rightIndex]}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </NavLink>

        {/* ================= NEWS BULLETIN SECTION ================= */}
        

      </section>

      {/* ================= BLACK FOOTER ================= */}
      <footer className="bg-black text-white py-10 text-center">
        <h3 className="text-xl font-heading tracking-widest uppercase">
          NO FAKE समाचार
        </h3>

        <p className="mt-4 text-sm opacity-70">
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