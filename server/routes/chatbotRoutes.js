const express = require("express");
const router = express.Router();
const { callPramaan } = require("../controllers/pramaanController");

// Pramaan: Text validity check
router.post("/pramaan", callPramaan);

module.exports = router;