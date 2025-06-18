const express = require("express");
const {
  getProducts,
  saveProduct, // ✅ FIXED: function is called saveProduct, not saveProducts
} = require("../controllers/products.controller");
const router = express.Router();

router.get("/products", getProducts);
router.post("/products", saveProduct); // ✅ FIXED

module.exports = router;
