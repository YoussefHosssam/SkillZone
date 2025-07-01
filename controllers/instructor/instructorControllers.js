const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);

const getInstructor = asyncHandler(async (req, res, next) => {});
const updateInstructor = asyncHandler(async (req, res, next) => {});
const deleteInstructor = asyncHandler(async (req, res, next) => {});
const getCenterInstructors = asyncHandler(async (req, res, next) => {});
const createCenterInstructors = asyncHandler(async (req, res, next) => {});

module.exports = {
  getInstructor,
  updateInstructor,
  deleteInstructor,
  getCenterInstructors,
  createCenterInstructors
};
