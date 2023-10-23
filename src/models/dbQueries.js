// dbQueries.js
const dbService = require("../services/dbService");

const dbQueries = {
  async createUserTemp(name, email) {
    console.log("DB QUERIES", name, email);
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    if (query) {
      console.log("Query is not null");
    } else {
      return { success: false, message: "Some thing wrong witht the query" };
    }
    const values = [name, email];
    const newUser = await dbService.query(query, values);
    console.log(newUser);
    if (newUser) {
      return {
        status: 200,
        success: true,
        message: "User created successfully",
      };
    } else {
      return { success: false, message: "Failed to create user" };
    }
    return newUser;
  },

  async createUser(
    fullName,
    email,
    rollNumber,
    phoneNumber,
    password,
    courseOpted,
    section
  ) {
    console.log(
      "DB QUERIES",
      fullName,
      email,
      rollNumber,
      phoneNumber,
      password,
      courseOpted,
      section
    );
    const query =
      "INSERT INTO students(full_name, email, roll_number, phone_number, password, course_opted, section) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    // const student_id = generateStudentId; // assuming you have a function to generate a unique student id
    const values = [
      fullName,
      email,
      rollNumber,
      phoneNumber,
      password,
      courseOpted,
      section,
    ];
    const newUser = await dbService.query(query, values);
    console.log("NEW USER", newUser);
    if (newUser) {
      console.log("NEW USER", newUser);
      return {
        status: 200,
        success: true,
        message: "User created successfully",
      };
    } else {
      console.log("NEW USER FAILEDs");
      return { success: false, message: "Failed to create user" };
    }
    return newUser;
  },

  // other queries...
};

module.exports = dbQueries;
