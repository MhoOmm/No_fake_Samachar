
import { useEffect } from 'react';
import './App.css';
import Heading from "../components/Landing/Heading";
import Hand from "../components/Landing/Hand";
import Aboutus from "../components/External/Aboutus";
import Pramaan from "../components/External/PramaanChatbot";
import Headlines from '../components/External/Headlines';
import FullNews from '../components/External/FullNews';
import Chatbot from '../components/ChatbotPage/chatbot';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    <Router>
      <Heading />
      <Routes>
        <Route path="/" element={<Hand />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/pramaanchatbot" element={<Pramaan />} />
        <Route path="/headlines" element={<Headlines />} />
        <Route path="/fullnews" element={<FullNews />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
