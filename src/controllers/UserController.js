// UserController.js
const dbService = require("../services/dbService");
const dbQueriesPOST = require("../models/dbQueriesPOST");
const dbQueriesGET = require("../models/dbQueriesGET");
const { use } = require("../routes");

const UserController = {
  async getAllUsers(req, res) {
    try {
      const users = await dbQueriesGET.getAllUsers();
      res.json(users);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getAllCourses(req, res) {
    try {
      const courses = await dbQueriesGET.getAllCourses();
      res.json(courses);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getStudentData(req, res) {
    const { data } = req.body;
    try {
      const student = await dbQueriesPOST.getStudentData(data);
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getTimeTable(req, res) {
    const { course_id } = req.params;
    console.log("The course id is ", course_id);
    try {
      const timetable = await dbQueriesGET.getTimeTable(
        course_id.toUpperCase()
      );
      res.json(timetable);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getNotification(req, res) {
    const { course_id } = req.body;
    console.log("get notification", course_id);
    try {
      const notificaion = await dbQueriesGET.getNotification(
        course_id.toUpperCase()
      );
      res.json(notificaion);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postUserDataTemp(req, res) {
    const { name, email } = req.body;
    console.log("dbQueriesGET controller", req.body);
    try {
      const dbQueriesGET = await dbQueriesPOST.createUserTemp(name, email);
      console.log("dbQueriesGET controller", dbQueriesGET);
      res.json(dbQueriesGET);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postUserData(req, res) {
    const {
      student_name,
      email,
      student_id,
      contact_number,
      branch,
      section,
      admitYear,
    } = req.body;
    console.log(
      "dbQueriesGET controller",
      student_name,
      email,
      student_id,
      contact_number,
      branch,
      section,
      admitYear
    );

    try {
      const dbQueriesGET = await dbQueriesPOST.createUser(
        student_name,
        email,
        student_id,
        contact_number,
        branch,
        section,
        admitYear
      );
      res.json(dbQueriesGET);
    } catch (err) {
      // console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postCourse(req, res) {
    const {
      course_id,
      course_name,
      course_objective,
      course_semester,
      instructor_id,
      timetable_id,
    } = req.body;

    console.log("COURSES", req.body);
    try {
      const course = await dbQueriesPOST.createCourse(
        course_id,
        course_name,
        course_objective,
        course_semester,
        instructor_id,
        timetable_id
      );
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postInstructor(req, res) {
    const {
      instructor_id,
      instructor_name,
      instructor_email,
      ongoing_course,
      contact_number,
      instructor_designation,
      office_status,
    } = req.body;
    console.log("INSTRUCTOR", req.body);
    try {
      const newInstructor = dbQueriesPOST.createInstructor(
        instructor_id,
        instructor_name,
        instructor_email,
        ongoing_course,
        contact_number,
        instructor_designation,
        office_status
      );
      res.json(newInstructor);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async postTimeTable(req, res) {
    const {
      timetable_id,
      period_type,
      days_of_week,
      start_time,
      end_time,
      venue,
    } = req.body;
    console.log(
      "TIME TABLE",
      timetable_id,
      period_type,
      days_of_week,
      start_time,
      end_time,
      venue
    );
    try {
      const newTimeTable = await dbQueriesPOST.createTimeTable(
        timetable_id,
        period_type,
        days_of_week,
        start_time,
        end_time,
        venue
      );
      res.json(newTimeTable);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async postNotification(req, res) {
    const { instructor_id, course_id, subject, message, date } = req.body;
    console.log(
      "the data in user controller",
      instructor_id,
      course_id,
      subject,
      message,
      date
    );
    try {
      const newNotification = await dbQueriesPOST.createNotification(
        instructor_id,
        course_id,
        subject,
        message,
        date
      );
      res.json(newNotification);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async markAttendance(req, res) {
    const {
      student_id,
      course_id,
      accuracy,
      time_stamp,
      date_of_attendance,
      day_of_week,
      section,
      status,
    } = req.body;

    console.log(
      "this is attendance marking : ",
      student_id,
      course_id,
      accuracy,
      time_stamp,
      date_of_attendance,
      day_of_week,
      section,
      status
    );
    try {
      const marked = dbQueriesPOST.markAttendance(
        student_id,
        course_id,
        accuracy,
        time_stamp,
        date_of_attendance,
        day_of_week,
        section,
        status
      );
      res.json(marked);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
