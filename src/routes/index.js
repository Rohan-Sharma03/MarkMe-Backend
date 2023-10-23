// index.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("You are using Backend servies of MarkMe !");
});

module.exports = router;
