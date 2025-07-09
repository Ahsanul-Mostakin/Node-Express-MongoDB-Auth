const { check } = require("express-validator");

exports.userRegistrationValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is missing")
    .isLength({ min: 5 })
    .withMessage("Name must be at least 5 characters")
    .isLength({ max: 30 })
    .withMessage("Name can have max 30 characters"),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
  check("dob")
    .trim()
    .notEmpty()
    .withMessage("Date of birth is missing")
    .isISO8601()
    .withMessage("Not a valid date")
    .toDate(),
];

exports.userLoginValidator = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is missing")
    .isEmail()
    .withMessage("Not a valid email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters"),
];
