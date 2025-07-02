const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);
const {
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require(`${__dirname}/../controllers/course/courseControllers.js`);
const express = require("express");
const courseRouter = express.Router();

courseRouter.route("/").get(getAllCourses);

courseRouter
  .route("/:slug")
  .get(getCourse)
  .patch(protect, restrictTo("centerAdmin", "admin"), updateCourse)
  .delete(protect, restrictTo("centerAdmin", "admin"), deleteCourse);

module.exports = courseRouter;
