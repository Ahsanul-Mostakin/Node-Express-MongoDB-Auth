const express = require("express");
const { body, validationResult } = require("express-validator");
const userRoutes = require("./routes/user");

const app = express();
const port = 3009;

// Middleware to parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", userRoutes);
// Test route
app.get("/test", (req, res) => {
  res.send("Testing the server!");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
