import './App.css'
import Heading from "../components/Landing/Heading"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "../components/ChatbotPage/chatbot"

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Heading />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Router>
    </div>
  )
}
export default App