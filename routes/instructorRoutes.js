
const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);
const {
  getInstructorCourses
} = require(`${__dirname}/../controllers/instructor/instructorControllers.js`);
const express = require("express");
const instructorRouter = express.Router();

instructorRouter
  .route("/:slug/courses")
  .get(protect,getInstructorCourses)

  module.exports = instructorRouter