const {
  protect,
  restrictTo,
  isRelatedCourse,
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
  .get(protect, restrictTo("centerAdmin", "admin"), isRelatedCourse, getCourse)
  .patch(
    protect,
    restrictTo("centerAdmin", "admin"),
    isRelatedCourse,
    updateCourse
  )
  .delete(
    protect,
    restrictTo("centerAdmin", "admin"),
    isRelatedCourse,
    deleteCourse
  ); //allnew
module.exports = courseRouter;
