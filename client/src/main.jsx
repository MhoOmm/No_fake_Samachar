import React from "react"; 
import { StrictMode } from 'react'
import ReactDOM from "react-dom/client";
import { createRoot } from 'react-dom/client'
import "@fontsource/playfair-display/700.css";
import "@fontsource/playfair-display/900.css";
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)
