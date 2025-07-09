const registerUser = async (req, res) => {
  try {
    const { name, email, password, dob } = req.body;

    const newUser = {
      name,
      email,
      password,
      dob,
    };

    return res.status(201).json({
      message: "User was created",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === "ahsanulmostakin@gmail.com" && password === "123456") {
      return res.status(201).json({
        message: "User was logged in",
        user: { email },
      });
    } else {
      return res.status(400).json({
        message: "Email/password didn't match",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { registerUser, loginUser };
