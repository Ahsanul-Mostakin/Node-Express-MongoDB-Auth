const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("I am a get request at home route");
  res.end();
});

app.post("/", (req, res) => {
  res.send("I am a post request at home route");
  res.end();
});

app.put("/", (req, res) => {
  res.send("I am a put request at home route");
  res.end();
});

app.delete("/", (req, res) => {
  res.send("I am a delete request at home route");
  res.end();
});

module.exports = app;
