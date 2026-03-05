const express = require("express");
const router = express.Router();
const { callPramaan } = require("../controllers/pramaanController");
const {analyzeHF} = require('../controllers/roberController')
const {analyzeWithModel} = require('../controllers/mlcontroller')

// Pramaan: Text validity check
router.post("/pramaan", callPramaan);
router.post("/analyze/hf", analyzeHF);
router.post("/analyze/fakenews",analyzeWithModel)

module.exports = router;