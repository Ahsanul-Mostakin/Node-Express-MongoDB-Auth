const path = require("path");
const products = require("../models/products.model.js");

exports.getProducts = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/product.html"));
};

exports.saveProduct = (req, res) => {
  const name = req.body.name;
  const price = Number(req.body.price);
  const product = { name, price }; // ✅ FIXED: renamed from 'products' to 'product'

  products.push(product); // ✅ Now pushing correctly

  res.status(201).json({
    success: true,
    products,
  });
};
