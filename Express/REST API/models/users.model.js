const { v4: uuidv4 } = require("uuid");
const users = [
  {
    id: uuidv4(),
    username: "ahsanul mostakin",
    email: "lalalal@yahoo.com",
  },
  {
    id: uuidv4(),
    username: "rakibul islam",
    email: "lalalal@yahoo.com",
  },
];
module.exports = users;
