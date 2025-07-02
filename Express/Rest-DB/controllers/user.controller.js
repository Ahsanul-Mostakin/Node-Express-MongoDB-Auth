const getAllUsers = (req, res) => {
  res.status(200).json({
    message: "all users",
  });
};

const getOneUser = (req, res) => {
  res.status(200).json({
    message: "get one user",
  });
};

const createUser = (req, res) => {
  res.status(201).json({
    message: "user is created",
  });
};

const updateUser = (req, res) => {
  res.status(200).json({
    message: "user is updated",
  });
};

const deleteUser = (req, res) => {
  res.status(200).json({
    message: "user is deleted",
  });
};
module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
