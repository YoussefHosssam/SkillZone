
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

module.exports = router;
