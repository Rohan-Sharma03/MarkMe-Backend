// UserController.js
const dbService = require("../services/dbService");
const dbQueriesPOST = require("../models/dbQueriesPOST");
const dbQueriesGET = require("../models/dbQueriesGET");
const { use } = require("../routes");
const bcrypt = require("bcrypt");

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
    console.log("temp data controller", req.body);
    try {
      const tempData = await dbQueriesPOST.createUserTemp(name, email);
      console.log("temo data controller", tempData);
      res.json(tempData);
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
      "Student Data",
      student_name,
      email,
      student_id,
      contact_number,
      branch,
      section,
      admitYear
    );

    try {
      const studentData = await dbQueriesPOST.createUser(
        student_name,
        email,
        student_id,
        contact_number,
        branch,
        section,
        admitYear
      );
      res.json(studentData);
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
      course_for,
      instructor_id,
      timetable_id,
    } = req.body;

    console.log("COURSES", req.body);
    try {
      const course = await dbQueriesPOST.createCourse(
        course_id,
        course_name,
        course_objective,
        course_for,
        instructor_id,
        timetable_id
      );
      res.json(course);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postInstructor(req, res) {
    // console.log("track the error", req);
    const {
      instructor_id,
      instructor_name,
      instructor_email,
      contact_number,
      instructor_designation,
      office_status,
      ongoing_course,
    } = req.body;
    console.log("INSTRUCTOR", req.body);
    try {
      const newInstructor = await dbQueriesPOST.createInstructor(
        instructor_id,
        instructor_name,
        instructor_email,
        contact_number,
        instructor_designation,
        office_status,
        ongoing_course
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
      const marked = await dbQueriesPOST.markAttendance(
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
  async postSignIn(req, res) {
    const { people_id, people_password, login_time } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(people_password, 9);
      const signIn = await dbQueriesPOST.iSignIn(
        people_id,
        hashedPassword,
        login_time
      );
      res.json(signIn);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postSignInDupli(req, res) {
    const { people_id, people_password } = req.body;
    try {
      const signInDupli = await dbQueriesPOST.iSignInDupli(
        people_id,
        people_password
      );
      res.json(signInDupli);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getProfile(req, res) {
    const { instructor_email } = req.body; // Assuming the instructor_id is in the URL parameters
    console.log("This is the instructor_email: ", instructor_email);

    try {
      const instructorData = await dbQueriesPOST.fetchProfile(instructor_email);
      res.json(instructorData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateAgenda(req, res) {
    const { lectureTopics, labTopics, course_id } = req.body;
    try {
      const newAgenda = await dbQueriesPOST.updateAgendaForCourse(
        course_id,
        lectureTopics,
        labTopics
      );
      res.json(newAgenda);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postInEnrollmentRequest(req, res) {
    const { course_id, instructor_id, course_for } = req.body;
    try {
      const newEnrollmentRequest = await dbQueriesPOST.postInEnrollmentRequest(
        instructor_id,
        course_id,
        course_for
      );
      res.json(newEnrollmentRequest);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getEnrolled(req, res) {
    const { student_id, branch, year } = req.body;
    try {
      const courseFor = (year + branch).toString();
      console.log("courseFor: ", courseFor);
      const enrolled = await dbQueriesPOST.getEnrolled(student_id, courseFor);
      res.json(enrolled);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async postStudentGetEnrollment(req, res) {
    const { course_id, student_id } = req.body;
    try {
      const accepted = await dbQueriesPOST.postStudentGetEnrollment(
        course_id,
        student_id
      );
      res.json(accepted);
    } catch (err) {
      console.log(err); 
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  async getInstructorcourse(req, res) {
    const { instructor_id } = req.body;
    try {
      const instructorCourses = await dbQueriesPOST.getInstructorcourse(
        instructor_id
      );
      res.json(instructorCourses);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }

  },

  async getEnrolledStudents(req,res){
    const {course_id} = req.body;
    try{
      const enrolledStudents = await dbQueriesPOST.getEnrolledStudents(course_id);
      res.json(enrolledStudents);
    }catch(err){
      console.log(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports = UserController;
