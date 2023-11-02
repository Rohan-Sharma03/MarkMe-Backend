// userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users", UserController.getAllUsers);
router.post("/csAccount", UserController.postUserData);
router.post("/csCourses", UserController.postCourse);
router.get("/getCourses", UserController.getAllCourses);
router.post("/ciAccount", UserController.postInstructor);
router.post("/cTimeTable", UserController.postTimeTable);
router.post("/studentData", UserController.getStudentData);
router.get("/:course_id/getTimeTable", UserController.getTimeTable);
router.post("/ciNotification", UserController.postNotification);
router.post("/csNotification", UserController.getNotification);
router.post("/csMarkAttendance", UserController.markAttendance);

// other user routes...

module.exports = router;
