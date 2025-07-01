const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);

const getAllCourses = asyncHandler(async (req, res, next) => {});
const getCourse = asyncHandler(async (req, res, next) => {});
const updateCourse = asyncHandler(async (req, res, next) => {});
const deleteCourse = asyncHandler(async (req, res, next) => {});

module.exports = {
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
};
