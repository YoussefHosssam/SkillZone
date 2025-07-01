
const express = require("express");
const router = express.Router();
const {
  getAllCenters,
  getSingleCenter,
  createCenter,
  deleteCenter,
  updateCenter,
} = require(`${__dirname}/../controllers/center/centerControllers.js`);
const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);

//Center Routes
router
  .route("/")
  .get(getAllCenters)
  .post(protect, restrictTo("centerAdmin", "admin"), createCenter);
router
  .route("/:id")
  .get(getSingleCenter)
  .patch(protect, restrictTo("centerAdmin", "admin"), updateCenter)
  .delete(protect, restrictTo("centerAdmin", "admin"), deleteCenter);

//Branch Routes
const {
  getAllBranches,
  createBranch,
} = require(`${__dirname}/../controllers/branch/branchControllers.js`);
router
  .route("/:id/branches")
  .get(getAllBranches)
  .post(protect, restrictTo("centerAdmin", "admin"), createBranch);

//Course Routes
const {
  getCenterInstructors,
  createCenterInstructors,
} = require(`${__dirname}/../controllers/instructor/instructorControllers.js`);
router
  .route("/:id/instructors")
  .get(getCenterInstructors)
  .post(protect, restrictTo("centerAdmin", "admin"), createCenterInstructors);

module.exports = router;
