import React, { useEffect, useState } from 'react';

const CustomScrollbar = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const text = "NO FAKE समाचार";

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
      setScrollPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate thumb position and height
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
  const documentHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0;
  const scrollRatio = viewportHeight / documentHeight;
  const thumbHeight = Math.max(scrollRatio * viewportHeight, 100); // Minimum 100px
  const trackHeight = viewportHeight;
  const maxThumbPosition = trackHeight - thumbHeight;
  const thumbPosition = (scrollPercentage / 100) * maxThumbPosition;

  return (
    <>
      {/* Custom Scrollbar Track */}
      <div className="fixed right-0 top-0 w-7 h-screen bg-offwhite/95 pointer-events-none z-50 shadow-lg">
        
        

        {/* Scrollbar Thumb with Text */}
        <div
          className={`absolute right-0 w-7 bg-charcoal rounded-lg transition-all duration-100 ease-out pointer-events-auto cursor-pointer shadow-xl ${
            isHovered ? 'bg-black' : 'bg-charcoal'
          }`}
          style={{
            top: `${thumbPosition}px`,
            height: `${thumbHeight}px`,
            minHeight: '100px',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Text on the Thumb */}
          <div className="w-full h-full flex items-center justify-center py-3">
            <div
              className="font-bold text-[11px] text-offwhite select-none leading-tight tracking-wider"
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                letterSpacing: '4px',
                fontFamily: "'Playfair Display', serif",
                fontWeight: '700',
              }}
            >
              {text}
            </div>
          </div>

          {/* Top Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-offwhite/30 rounded-full"></div>
          
          {/* Bottom Decoration */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1 bg-offwhite/30 rounded-full"></div>
        </div>
      </div>

      {/* Hide default scrollbar */}
      <style>{`
        /* Hide default scrollbar but keep functionality */
        html::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }

        html {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        body {
          padding-right: 0 !important;
          margin-right: 0 !important;
        }

        /* Ensure smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};

export default CustomScrollbar;
