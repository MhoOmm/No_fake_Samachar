import React from 'react'
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import image1 from "../../assets/image1.jpeg";
import image2 from "../../assets/image2.jpeg";
const NewsSection = () => {
  return (
    <div className="absolute top-100 w-full flex flex-col items-center z-20">

          <h3 className="text-xl md:text-2xl font-heading tracking-widest mb-6 text-charcoal">
            Explore Our News Bulletin & Inshorts
          </h3>

          <div className="flex gap-12">

            {/* Detailed */}
            <NavLink to="/bulletin" className="group text-center">
              <div className="overflow-hidden rounded-xl shadow-xl">
                <img
                  src={image1}
                  alt="Detailed News"
                  className="w-48 h-48 object-cover transition duration-500 group-hover:blur-sm"
                />
              </div>
              <p className="mt-3 font-semibold tracking-wide text-charcoal group-hover:text-black transition">
                Detailed
              </p>
            </NavLink>

            {/* Inshorts */}
            <NavLink to="/inshorts" className="group text-center">
              <div className="overflow-hidden rounded-xl shadow-xl">
                <img
                  src={image2}
                  alt="Inshorts"
                  className="w-48 h-48 object-cover transition duration-500 group-hover:blur-sm"
                />
              </div>
              <p className="mt-3 font-semibold tracking-wide text-charcoal group-hover:text-black transition">
                Inshorts
              </p>
            </NavLink>

          </div>
        </div>
  )
}

export default NewsSection