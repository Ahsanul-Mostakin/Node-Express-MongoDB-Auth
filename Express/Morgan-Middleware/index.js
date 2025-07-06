const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

app.get("/products", (req, res) => {
  res.send("List all the products!");
});
app.post("/products", (req, res) => {
  res.status(201).send("create a product!");
});

app.listen(3000, () => {
  console.log(`server is running at http://localhost:3000`);
});
