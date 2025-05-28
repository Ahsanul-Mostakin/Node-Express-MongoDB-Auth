const fs = require("fs");

const result = fs.existsSync("demo1.txt");

if (result) {
  console.log("found");
} else {
  console.log("not found");
}
