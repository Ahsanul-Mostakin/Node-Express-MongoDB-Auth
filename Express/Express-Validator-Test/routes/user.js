const express = require("express");
const { body, validationResult } = require("express-validator");
const { runValidation } = require("../validations");
const { registerUser, loginUser } = require("../controllers/user");
const {
  userRegistrationValidator,
  userLoginValidator,
} = require("../validations/auth");
const userRoutes = express.Router();
// Register route with validation
userRoutes.post(
  "/login",
  userLoginValidator,
  runValidation,
  loginUser //
);

// Login route
userRoutes.post(
  "/login",
  userLoginValidator,

  runValidation
);

module.exports = userRoutes;
