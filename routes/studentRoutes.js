const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);
const {
  addStudentInformation,
} = require(`${__dirname}/../controllers/user/studentControllers.js`);
const express = require("express");
const studentRouter = express.Router();

studentRouter
  .route("/information")
  .post(protect, restrictTo("student", "admin"), addStudentInformation); //new
module.exports = studentRouter;
