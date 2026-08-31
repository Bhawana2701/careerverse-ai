const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error("Create user error:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to create user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error("Get users error:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch users",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};