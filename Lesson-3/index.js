// os, path
// const os = require("os");
// console.log(os.userInfo());
// console.log(os.homedir());
// console.log(os.hostname());

// console.log(__dirname);
// console.log(__filename);

const path = require("path");

const joinName = path.join(__dirname + "/../views");
console.log(joinName);
