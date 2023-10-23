// User.js
const dbService = require("../services/dbService");

const User = {
  async getAllUsers() {
    const query = "SELECT * FROM person";
    const users = await dbService.query(query);
    return users;
  },
  // other model methods...
};

module.exports = User;
