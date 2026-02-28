const express = require("express");
const router = express.Router();
const { callPramaan } = require("../controllers/pramaanController");
const {analyzeHF} = require('../controllers/roberController')

// Pramaan: Text validity check
router.post("/pramaan", callPramaan);
router.post("/analyze/hf", analyzeHF);

module.exports = router;