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
    <section className="relative w-full h-screen bg-offwhite overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src={hands}
        alt="Human and AI"
        className="absolute inset-0 w-full h-full object-contain -translate-y-20 pointer-events-none"
      />

      {/* ================= LEFT ================= */}
      <NavLink
        to="/validator"
        className="absolute left-6 md:left-16 top-1/2 -translate-y-90 group z-10"
      >
        <motion.div
          whileHover={{ y: -12 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="px-6 py-5 rounded-2xl transition-all duration-500
                     group-hover:bg-black"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold
                         group-hover:text-white transition">
            Nishpaksh
          </h2>

          {/* TYPEWRITER LEFT */}
          <AnimatePresence mode="wait">
            <motion.p
              key={leftTexts[leftIndex]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-newsred text-xl font-semibold mt-2
                         group-hover:text-white"
            >
              {leftTexts[leftIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </NavLink>


      {/* ================= RIGHT ================= */}
      <NavLink
        to="/news"
        className="absolute right-6 md:right-16 top-1/2 -translate-y-76 group z-10"
      >
        <motion.div
          whileHover={{ y: 12 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="px-6 py-5 rounded-2xl text-right transition-all duration-500
                     group-hover:bg-black"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold
                         group-hover:text-white transition">
            Pramaan
          </h2>

          {/* TYPEWRITER RIGHT */}
          <AnimatePresence mode="wait">
            <motion.p
              key={rightTexts[rightIndex]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="text-newsred text-xl font-semibold mt-2
                         group-hover:text-white"
            >
              {rightTexts[rightIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </NavLink>

    </section>
  );
};

export default Hand;