const express = require("express");
const chalk = require("chalk");

const app = express();

app.get("/products", (req, res) => {
  res.send("List all the products!");
});

app.listen(3000, () => {
  console.log(
    chalk.blue.bgRed.bold(`server is running at http://localhost:3000`)
  );
});
