// userRoutes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/users", UserController.getAllUsers);
router.post("/csAccount", UserController.postUserData);
router.post("/cstemp", UserController.postUserDataTemp);

// other user routes...

module.exports = router;
