const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);
const {
  getStudent,
  addStudentInformation,
  updateStudent,
  deleteStudent,
} = require(`${__dirname}/../controllers/student/studentControllers.js`);
const express = require("express");
const studentRouter = express.Router();

studentRouter
  .route("/information")
  .post(addStudentInformation)
  .get(getStudent)
  .patch(protect, restrictTo("student", "admin"), updateStudent)
  .delete(protect, restrictTo("student", "admin"), deleteStudent);

module.exports = studentRouter;
