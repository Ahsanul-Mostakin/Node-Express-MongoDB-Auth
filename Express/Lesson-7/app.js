const express = require("express");
const userRouter = require("./routes/users.route");

const app = express();

// Mount user router
app.use("/api/user", userRouter);

// Register Page
app.use("/register", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/register.html");
});

// Login

app.use("/login", (req, res) => {
  // res.cookie("name", "rabaya");
  // res.cookie("age", "30");

  res.clearCookie("name");
  res.append("id", "130000");
  res.end();
});

// Home route
app.use("/", (req, res) => {
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/index.html");
});

// Fallback route (404)
app.use((req, res) => {
  res.status(404).send("<h1>404 !!! Not a valid url</h1>");
});

module.exports = app;
