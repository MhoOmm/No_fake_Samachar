const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
require("dotenv").config();

const { connect } = require("./config/db");
const chatbotRoutes = require("./routes/chatbotRoutes");
const newsRoutes = require("./routes/newsRoutes"); 

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/news", newsRoutes);
// for pinging health check
app.get("/health", (req, res) => {
  res.json({ status: "backend running" });
});

// for pinging the MLService :)
setInterval(async () => {
  try {
    await axios.get(
      "https://no-fake-samachar-mlservice.onrender.com/warmup"
    );

    console.log("ML service kept warm");
  } catch (error) {
    console.log("ML service sleeping");
  }
}, 4 * 60 * 1000);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});