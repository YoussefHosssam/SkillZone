const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);

const getStudent = asyncHandler(async (req, res, next) => {});
const addStudentInformation = asyncHandler(async (req, res, next) => {});
const updateStudent = asyncHandler(async (req, res, next) => {});
const deleteStudent = asyncHandler(async (req, res, next) => {});

module.exports = {
  getStudent,
  addStudentInformation,
  updateStudent,
  deleteStudent,
};
