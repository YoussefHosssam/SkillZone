
const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);
const {
  getInstructor,
  updateInstructor,
  deleteInstructor,
} = require(`${__dirname}/../controllers/instructor/instructorControllers.js`);
const express = require("express");
const instructorRouter = express.Router();

instructorRouter
  .route("/:id")
  .get(protect,getInstructor)
  .patch(protect, restrictTo("centerAdmin", "admin"), updateInstructor)
  .delete(protect, restrictTo("centerAdmin", "admin"), deleteInstructor);

  module.exports = instructorRouter