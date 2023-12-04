// userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users", UserController.getAllUsers);
router.post("/csAccount", UserController.postUserData);
router.post("/csCourses", UserController.postCourse);
router.get("/getCourses", UserController.getAllCourses);
router.post("/ciAccount", UserController.postInstructor);
router.post("/caTimeTable", UserController.postTimeTable);
router.post("/studentData", UserController.getStudentData);
router.get("/:course_id/getTimeTable", UserController.getTimeTable);
router.post("/ciNotification", UserController.postNotification);
router.post("/csNotification", UserController.getNotification);
router.post("/csMarkAttendance", UserController.markAttendance);
router.post("/iSignIn", UserController.postSignIn);
router.post("/iSignInDupli", UserController.postSignInDupli);
router.post("/getProfile", UserController.getProfile);
router.post("/ciUpdateAgenda", UserController.updateAgenda);
router.post("/ciAddCourseRequest", UserController.postInEnrollmentRequest);
router.post("/csGetEnroll", UserController.getEnrolled);
router.post("/csAcceptEnrollment", UserController.postStudentGetEnrollment);
router.post("/ciGetInstructorCourses", UserController.getInstructorcourse);
router.post("/ciGetEnrolledStudents", UserController.getEnrolledStudents);

// other user routes...

module.exports = router;
