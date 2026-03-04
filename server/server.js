const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});