// dbQueries.js
const dbService = require("../services/dbService");
const bcrypt = require("bcrypt");
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
    course_for,
    instructor_id,
    timetable_id
  ) {
    console.log(
      "COURSES IN QUERIES",
      course_id,
      course_name,
      course_objective,
      course_for,
      instructor_id,
      timetable_id
    );
    const query =
      "INSERT INTO course(course_id, course_name, course_objective, course_for, instructor_id, timetable_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [
      course_id,
      course_name,
      course_objective,
      course_for,
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
        return {
          status: 409,
          success: false,
          message: "Failed to create course",
        };
      }
    } catch (error) {
      console.error("Error creating course:", error);
      return {
        status: 500,
        success: false,
        message: "Failed to create course",
      };
    }
  },

  async createInstructor(
    instructor_id,
    instructor_name,
    instructor_email,
    contact_number,
    instructor_designation,
    office_status,
    ongoing_course
  ) {
    const query =
      "INSERT INTO instructor(instructor_id,instructor_name,instructor_email,contact_number,instructor_designation,office_status,ongoing_course) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *";

    const values = [
      instructor_id,
      instructor_name,
      instructor_email,
      contact_number,
      instructor_designation,
      office_status,
      ongoing_course,
    ];
    try {
      const newInstructor = await dbService.query(query, values);
      if (newInstructor) {
        return {
          status: 200,
          success: true,
          message: "Instructor added successfully",
        };
      } else {
        console.log("NEW Instructor FAILED");
        return {
          status: 409,
          success: false,
          message: "Failed to create Instructor",
        };
      }
    } catch (error) {
      console.error("Error creating Instructor:", error);
      return {
        status: 500,
        success: false,
        message: "Failed to create Instructor",
      };
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
      if (student && student.length > 0) {
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

  async createNotification(instructor_id, course_id, subject, message, date) {
    console.log(
      "THe date in db QUEIRES ",
      instructor_id,
      course_id,
      subject,
      message,
      date
    );
    const query =
      "INSERT INTO notification(instructor_id,course_id,subject,message,date) VALUES($1,$2,$3,$4,$5) RETURNING *";
    const values = [instructor_id, course_id, subject, message, date];
    try {
      const newNotification = dbService.query(query, values);
      if (newNotification) {
        return {
          status: 200,
          success: true,
          message: "Notification created successfully",
          data: newNotification,
        };
      } else {
        console.log("Data unavailable");
        return {
          success: false,
          message: "failed created successfully",
        };
      }
    } catch (err) {
      console.error("Error creating notification:", err);
      return { success: false, message: "Failed creating notificaion" };
    }
  },
  async markAttendance(
    student_id,
    course_id,
    accuracy,
    time_stamp,
    date_of_attendance,
    day_of_week,
    section,
    status
  ) {
    console.log("attendance data recived : ", {
      student_id,
      course_id,
      accuracy,
      time_stamp,
      date_of_attendance,
      day_of_week,
      section,
      status,
    });
    try {
      const query =
        "INSERT INTO attendance(student_id,course_id,accuracy,time_stamp,date_attended,day_of_week,section,status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *";
      const values = [
        student_id,
        course_id,
        accuracy,
        time_stamp,
        date_of_attendance,
        day_of_week,
        section,
        status,
      ];
      const marked = dbService.query(query, values);
      if (marked) {
        return {
          success: true,
          message: "Attendance marked successfully",
          data: marked,
        };
      } else {
        console.log("Data not available");
        return {
          sucess: false,
          message: "Attendace not marked sucessfully",
        };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: "Failed marking attendance" };
    }
  },

  async iSignIn(people_id, hashedPassword, login_time) {
    const query = `INSERT INTO people(people_id,people_password,login_time) VALUES($1,$2,$3)`;
    const values = [people_id, hashedPassword, login_time];
    try {
      const signIn = await dbService.query(query, values);
      if (signIn) {
        return {
          statuss: 201,
          success: true,
          message: "Sign in successful",
          data: signIn,
        };
      } else {
        return {
          status: 409,
          success: false,
          message: "Sign in failed",
        };
      }
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        success: false,
        message: "Sign in failed",
      };
    }
  },

  async iSignInDupli(people_id, people_password) {
    const query = `SELECT * FROM people WHERE people_id=$1`;
    const values = [people_id];
    try {
      const result = await dbService.query(query, values);
      if (result[0]) {
        const storedHashedPassword = result[0].people_password;
        const match = await bcrypt.compare(
          people_password,
          storedHashedPassword
        );

        if (match) {
          const updateQuery =
            "UPDATE people SET login_time = CURRENT_TIMESTAMP WHERE people_id =$1";
          await dbService.query(updateQuery, [people_id]);
          return { status: 200, success: true, message: "Login successful" };
        } else {
          return {
            status: 409,
            success: false,
            message: "Invalid credentials",
          };
        }
      } else {
        return { status: 500, success: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error in iSignInDupli:", error);
      throw error;
    }
  },

  async fetchProfile(instructor_email) {
    const query = "SELECT * FROM instructor WHERE instructor_email = $1";
    const values = [instructor_email];
    console.log("Instructor ID:", instructor_email);

    try {
      const profile = await dbService.query(query, values);
      if (profile) {
        return {
          status: 200,
          success: true,
          message: "Data fetched successfully",
          data: profile,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: "No data found for the provided ID",
        };
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },

  async updateAgendaForCourse(course_id, lectureTopics, labTopics) {
    const query =
      "INSERT INTO agenda (course_id, lecturetopics, labtopics) VALUES ($3, $1, $2) ON CONFLICT (course_id) DO UPDATE SET lecturetopics = $1, labtopics = $2 RETURNING *";

    const values = [lectureTopics, labTopics, course_id];
    try {
      const updatedAgenda = await dbService.query(query, values);
      if (updatedAgenda) {
        return {
          status: 200,
          success: true,
          message: "Agenda updated successfully",
          data: updatedAgenda,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: "No data found for the provided ID",
        };
      }
    } catch (error) {
      console.error("Error updating agenda:", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },
  async postInEnrollmentRequest(instructor_id, course_id, course_for) {
    const query = `INSERT INTO enrollmentRequest(instructor_id, course_id, course_for) VALUES ($1, $2, $3) RETURNING *`;
    const values = [instructor_id, course_id, course_for];
    try {
      const newEnrollmentRequest = await dbService.query(query, values);
      if (newEnrollmentRequest) {
        return {
          status: 200,
          success: true,
          message: "Enrollment request created successfully",
          data: newEnrollmentRequest,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: "No data found for the provided ID",
        };
      }
    } catch (error) {
      console.error("Error creating enrollment request:", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },

  async getEnrolled(student_id, course_for) {
    console.log("Check for stundets", await this.getStudentData(student_id));
    const isStudentPresent = await this.getStudentData(student_id);
    if (isStudentPresent.success) {
      const query = `SELECT * FROM enrollmentRequest WHERE course_for = $1`;
      const values = [course_for];
      try {
        const enrolled = await dbService.query(query, values);
        if (enrolled) {
          return {
            status: 200,
            success: true,
            message: "Enrolled courses fetched successfully",
            data: enrolled,
          };
        } else {
          return {
            status: 404,
            success: false,
            message: "No data found for the provided ID",
          };
        }
      } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return {
          status: 500,
          success: false,
          message: "Internal server error",
        };
      }
    } else {
      console.error("Error fetching student id :", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },
  async postStudentGetEnrollment(course_id, student_id) {
    const checkExistingQuery = `SELECT * FROM enrollment WHERE course_id = $1 AND student_id = $2`;
    const checkExistingValues = [course_id, student_id];

    try {
      // Check if the student is already enrolled
      const existingEnrollment = await dbService.query(
        checkExistingQuery,
        checkExistingValues
      );

      if (existingEnrollment && existingEnrollment.length > 0) {
        return {
          status: 400,
          success: false,
          message: "Student is already enrolled in this course",
        };
      }

      // If not enrolled, insert the enrollment record
      const query = `INSERT INTO enrollment(course_id, student_id) VALUES ($1, $2) RETURNING *`;
      const values = [course_id, student_id];

      const accepted = await dbService.query(query, values);
      if (accepted) {
        return {
          status: 200,
          success: true,
          message: "Enrollment request accepted successfully",
          data: accepted,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: "No data found for the provided ID",
        };
      }
    } catch (error) {
      console.error("Error accepting enrollment request:", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },
  async getInstructorcourse(instructor_id) {
    const query = `SELECT * FROM course WHERE instructor_id = $1`;
    const values = [instructor_id];
    try {
      const instructorCourses = await dbService.query(query, values);
      if (instructorCourses) {
        return {
          status: 200,
          success: true,
          message: "Instructor courses fetched successfully",
          data: instructorCourses,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: "No data found for the provided ID",
        };
      }
    } catch (error) {
      console.error("Error fetching instructor courses:", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },

  async getEnrolledStudents(course_id) {
    const query = `SELECT students.student_id, students.student_name, students.email, students.contact_number, students.branch, students.section, students.admit_year
    FROM students
    JOIN enrollment ON students.student_id = enrollment.student_id
    WHERE enrollment.course_id = $1;
    `;
    const values = [course_id];
    try {
      const enrolledStudents = await dbService.query(query, values);
      if (enrolledStudents) {
        return {
          status: 200,
          success: true,
          message: "Enrolled students fetched successfully",
          data: enrolledStudents,
        };
      } else {
        return {
          status: 404,
          success: false,
          message: "No data found for the provided ID",
        };
      }
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
      return {
        status: 500,
        success: false,
        message: "Internal server error",
      };
    }
  },
};

module.exports = dbQueriesPOST;
