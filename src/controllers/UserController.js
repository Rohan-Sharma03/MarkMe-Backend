// UserController.js
const dbService = require("../services/dbService");
const dbQueries = require("../models/dbQueries");
const User = require("../models/User");
const { use } = require("../routes");

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postUserDataTemp(req, res) {
    const { name, email } = req.body;
    console.log("User controller", req.body);
    try {
      const user = await dbQueries.createUserTemp(name, email);
      console.log("User controller", user);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postUserData(req, res) {
    const {
      name,
      email,
      rollNumber,
      phoneNumber,
      password,
      courseOpted,
      section,
    } = req.body;
    console.log("User controller", req.body);

    try {
      const user = await dbQueries.createUser(
        name,
        email,
        rollNumber,
        phoneNumber,
        password,
        courseOpted,
        section
      );
      res.json(user);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  // other controller methods...
};

module.exports = UserController;
