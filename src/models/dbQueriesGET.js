// User.js
const dbService = require("../services/dbService");

const dbQueriesGET = {
  async getAllUsers() {
    const query = "SELECT * FROM students";
    const users = await dbService.query(query);
    return users;
  },

  async getAllCourses() {
    const query = "SELECT * FROM course";
    const courses = await dbService.query(query);
    return courses;
  },
  // other model methods...
};

module.exports = dbQueriesGET;
