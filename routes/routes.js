const express = require("express");
const router = express.Router();

const users = [];

router.get("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
