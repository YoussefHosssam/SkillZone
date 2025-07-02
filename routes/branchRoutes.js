// GET /branches/:branchId/courses - List courses for a branch
const express = require("express");
const router = express.Router();
const {
  getSingleBranch,
  deleteBranch,
  updateBranch,
  getNearbyBranches,
} = require(`${__dirname}/../controllers/branch/branchControllers.js`);
const {
  getBranchCourses,
  createBranchCourse,
} = require(`${__dirname}/../controllers/course/courseControllers.js`);
const {
  getBranchInstructors,
} = require(`${__dirname}/../controllers/instructor/instructorControllers.js`);
const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);

//Branch Routes
router.get("/nearby", protect, getNearbyBranches);
router
  .route("/:id")
  .get(getSingleBranch)
  .patch(protect, restrictTo("centerAdmin", "admin"), updateBranch)
  .delete(protect, restrictTo("centerAdmin", "admin"), deleteBranch);
router
  .route("/:id/courses")
  .get(getBranchCourses)
  .post(protect, restrictTo("centerAdmin", "admin"), createBranchCourse);
router
  .route("/:id/instructors")
  .get(protect , getBranchInstructors)
module.exports = router;
