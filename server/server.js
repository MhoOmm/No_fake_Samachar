const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connect } = require("./config/db");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

app.use(express.json());


app.use(cookieParser());


app.use(cors({
    origin: "*",
    credentials: true
}));


app.use("/api/chatbot", chatbotRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});