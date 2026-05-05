const express = require("express");
const router = express.Router();
const axios = require("axios");

// HEALTH
router.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    versao: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
