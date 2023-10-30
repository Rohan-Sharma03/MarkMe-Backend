// dbQueries.js
const dbService = require("../services/dbService");

const dbQueriesPOST = {
  async createUserTemp(name, email) {
    console.log("DB QUERIES", name, email);
    const query = "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *";
    if (!query) {
      return { success: false, message: "Something wrong with the query" };
    }
    const values = [name, email];
    try {
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
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: "Failed to create user" };
    }
  },

  async createUser(
    student_name,
    email,
    student_id,
    contact_number,
    branch,
    section,
    admitYear
  ) {
    console.log(
      "DB QUERIES",
      student_name,
      email,
      student_id,
      contact_number,
      branch,
      section,
      admitYear
    );
    const query =
      "INSERT INTO students(student_name, email, student_id , contact_number, branch, section, admit_year) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
    const values = [
      student_name,
      email,
      student_id,
      contact_number,
      branch,
      section,
      admitYear,
    ];
    try {
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
        console.log("NEW USER FAILED");
        return { success: false, message: "Failed to create user" };
      }
    } catch (error) {
      console.error("Error creating user:", error);
      return { success: false, message: "Failed to create user" };
    }
  },

  async createCourse(
    course_id,
    course_name,
    course_objective,
    course_semester,
    instructor_id,
    timetable_id
  ) {
    console.log(
      "COURSES IN QUERIES",
      course_id,
      course_name,
      course_objective,
      course_semester,
      instructor_id,
      timetable_id
    );
    const query =
      "INSERT INTO course(course_id, course_name, course_objective, course_semester, instructor_id, timetable_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      course_id,
      course_name,
      course_objective,
      course_semester,
      instructor_id,
      timetable_id,
    ];
    try {
      const newCourse = await dbService.query(query, values);
      console.log("RES COURSES", newCourse);
      if (newCourse) {
        return {
          status: 200,
          success: true,
          message: "Course added successfully",
        };
      } else {
        console.log("NEW Courses FAILED");
        return { success: false, message: "Failed to create course" };
      }
    } catch (error) {
      console.error("Error creating course:", error);
      return { success: false, message: "Failed to create course" };
    }
  },

  async createInstructor(
    instructor_id,
    instructor_name,
    instructor_email,
    ongoing_course,
    contact_number,
    instructor_designation,
    office_status
  ) {
    const query =
      "INSERT INTO instructor(instructor_id,instructor_name,instructor_email,ongoing_course,contact_number,instructor_designation,office_status) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING *";

    const values = [
      instructor_id,
      instructor_name,
      instructor_email,
      ongoing_course,
      contact_number,
      instructor_designation,
      office_status,
    ];
    try {
      const newInstructor = dbService.query(query, values);
      if (newInstructor) {
        return {
          status: 200,
          success: true,
          message: "Instructor added successfully",
        };
      } else {
        console.log("NEW Instructor FAILED");
        return { success: false, message: "Failed to create Instructor" };
      }
    } catch (error) {
      console.error("Error creating Instructor:", error);
      return { success: false, message: "Failed to create Instructor" };
    }
  },

  async createTimeTable(
    timetable_id,
    period_type,
    days_of_week,
    start_time,
    end_time,
    venue
  ) {
    const query =
      "INSERT INTO timetable(timetable_id,period_type,days_of_week, start_time,end_time,venue) VALUES($1, $2, $3, $4, $5,$6) RETURNING *";

    const values = [
      timetable_id,
      period_type,
      days_of_week,
      start_time,
      end_time,
      venue,
    ];
    try {
      const newTimeTable = await dbService.query(query, values);
      if (newTimeTable) {
        return {
          status: 200,
          success: true,
          message: "Time Table added successfully",
        };
      } else {
        console.log("NEW Time Table FAILED");
        return { success: false, message: "Failed to create time table" };
      }
    } catch (error) {
      console.error("Error creating time table:", error);
      return { success: false, message: "Failed to create timetable" };
    }
  },

  async getStudentData(data) {
    const query = `SELECT * FROM students WHERE student_id='${data}'`;
    try {
      const student = await dbService.query(query);
      console.log("STUDENT DATA", student);
      if (student) {
        return {
          status: 200,
          success: true,
          message: "Data retrieved successfully",
          data: student[0], // Assuming the 'student' variable contains the fetched data
        };
      } else {
        console.log("Data unavailable");
        return { success: false, message: "Failed to get data" };
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      return { success: false, message: "Failed to fetch student data" };
    }
  },
};

module.exports = dbQueriesPOST;
