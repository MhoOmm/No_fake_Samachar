const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { connect } = require("./config/db");

const app = express();

connect();

app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});