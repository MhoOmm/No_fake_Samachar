import { useState,useEffect } from 'react'
import './App.css'
import Heading from "../components/Landing/Heading"
import Hand from "../components/Landing/Hand"
import { Routes, Route } from "react-router-dom";
import Lenis from 'lenis';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <Routes>
      <Route path="/"
        element={
          <>
            <Heading />
            <Hand />
          </>
      }/>
    </Routes>
  )
}

export default App
