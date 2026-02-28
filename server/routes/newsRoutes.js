const express = require("express");
const { getNews } = require("../controllers/newsController");

const router = express.Router();

// GET /api/news?country=us&category=technology
router.get("/", getNews);

module.exports = router;