import React from "react";
import logo from "../../assets/logo.jpeg";

const Heading = () => {

  // Dynamic Date
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-offwhite text-charcoal border-b-4 border-charcoal">

      {/* TOP NEWSPAPER INFO BAR */}
      <div className="flex justify-between px-6 md:px-12 py-2 text-xs tracking-widest border-b border-charcoal/40">
        <span>NO FAKE समाचार • DIGITAL EDITION</span>
        <span>{today}</span>
      </div>

      {/* MASTHEAD */}
      <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-6">

        {/* LOGO */}
        <div className="mb-3 md:mb-0">
          <img
            src={logo}
            alt="Logo"
            className="h-16 md:h-24 w-auto object-contain"
          />
        </div>

        {/* TITLE */}
        <div className="text-center flex-1">
          <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[0.2em] uppercase">
            NO FAKE समाचार
          </h1>

          <p className="text-newsred text-lg sm:text-xl md:text-2xl font-semibold tracking-wide mt-3 uppercase">
            Verify Before You Believe
          </p>

          {/* Newspaper Divider */}
          <div className="w-40 h-[2px] bg-newsred mx-auto mt-4"></div>
        </div>

        {/* RIGHT SPACE (balances layout like real newspapers) */}
        <div className="hidden md:block w-20"></div>

      </div>

    </header>
  );
};

export default Heading;