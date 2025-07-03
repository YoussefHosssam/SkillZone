const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);
const Course = require(`${__dirname}/../../models/course/courseModel.js`);
const {
  getSingleDocument,
  deleteDocument,
  updateDocument,
} = require(`${__dirname}/../factoryHandler.js`);
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);

const getInstructor = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (course) {
    successResponse(res, 200, {
      message: "Instructor details found successfully",
      data: course.instructorDetails,
    });
  } else {
    return next(new AppError("Not found , Invalid Course id", 404));
  }
});
const getBranchInstructors = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const instructors = await Course.find({ branchId: id }).select(
    "+instructorDetails"
  );
  if (instructors) {
    successResponse(res, 200, {
      message: "Instructors found successfully",
      data: instructors,
    });
  } else {
    return next(new AppError("Not found , Invalid Branch id", 404));
  }
});
const getInstructorCourses = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const courses = await Course.find({
    "instructorDetails.fullnameSlug": slug, // ✅ dot notation
  }).select("-instructorDetails");
  if (!(courses.length === 0)) {
    successResponse(res, 200, {
      message: "Courses found successfully",
      data: courses,
    });
  } else {
    return next(new AppError("Not found , Invalid Instructor", 404));
  }
});

module.exports = {
  getInstructor,
  getBranchInstructors,
  getInstructorCourses,
};
