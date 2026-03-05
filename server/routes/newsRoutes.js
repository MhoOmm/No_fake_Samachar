<<<<<<< HEAD
const express = require("express");
const { getNews } = require("../controllers/newsController");

const router = express.Router();

// GET /api/news?country=us&category=technology
router.get("/", getNews);

=======
const express = require("express");
const { getNews } = require("../controllers/newsController");

const router = express.Router();

// GET /api/news?country=us&category=technology
router.get("/", getNews);

>>>>>>> d8a3b7eeba2d01a9973f4345b4d9f155d6cea9e1
module.exports = router;