const express = require("express");
const userRouter = require("./routes/users.route");

const app = express();

// Mount user router
app.use("/api/user", userRouter);

// Register Page
app.use("/register", (req, res) => {
  // res.status(200).json({
  //   name: "Ahsanul Mostakin",
  //   message: "I am register page",
  //   statusCode: 200,
  // });
  res.redirect("/login");
});

// Login

app.use("/login", (req, res) => {
  res.send("Hi! I am login Page");
});

// Home route
app.use("/", (req, res) => {
  res.send("Hi I am Home Page");
});

// Fallback route (404)
app.use((req, res) => {
  res.status(404).send("<h1>404 !!! Not a valid url</h1>");
});

module.exports = app;
