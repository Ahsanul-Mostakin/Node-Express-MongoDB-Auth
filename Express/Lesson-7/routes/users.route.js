const express = require("express");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("I am a get request at home route");
//   res.end();
// });

router.get("/register", (req, res) => {
  res.send("I am a get request at register route");
  res.end();
});

router.get("/login", (req, res) => {
  res.send("I am a get request at login route");
  res.end();
});

module.exports = router;
