let users = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");

// get users
const getAllUser = (req, res) => {
  res.status(200).json({ users });
};

// create users
const createUser = (req, res) => {
  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    email: req.body.email,
  };
  users.push(newUser);
  res.status(200).json(users);
};

// update users
const updateUser = (req, res) => {
  const userid = req.params.id;
  const { username, email } = req.body;

  const user = users.find((u) => u.id === userid);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.username = username || user.username;
  user.email = email || user.email;

  res.status(200).json(user);
};

// delete users
const deleteUser = (req, res) => {
  const userid = req.params.id;
  users = users.filter((user) => user.id !== userid); // fix: use !== instead of assignment
  res.status(200).json({ message: "User deleted" });
};

module.exports = { getAllUser, createUser, updateUser, deleteUser };
