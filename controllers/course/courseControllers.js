const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const qs = require("qs");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);
const Course = require(`${__dirname}/../../models/course/courseModel.js`);
const Branch = require(`${__dirname}/../../models/branch/branchModel.js`);
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);

const { getAllDocuments } = require(`${__dirname}/../factoryHandler.js`);

const getAllCourses = asyncHandler(async (req, res, next) => {
  getAllDocuments(Course, req, res, next);
});
const getCourse = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const course = await Course.findOne({ slug });
  if (course) {
    successResponse(res, 200, {
      message: "Course found successfully",
      data: course,
    });
  } else {
    return next(new AppError("Course not found", 404));
  }
});
const updateCourse = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const body = req.body;
  const updateableFields = [
    "title",
    "description",
    "category",
    "price",
    "duration",
    "startDate",
    "schedule",
    "capacity",
    "enrolled",
    "requirments",
    "isActive",
    "isFull",
    "instructorDetails",
  ];
  const bodyKeys = Object.keys(body);
  bodyKeys.forEach((el) => {
    if (!updateableFields.includes(el)) {
      delete body[el];
    }
  });
  body.updatedAt = Date.now();
  const course = await Course.findOne({ slug });
  if (course) {
    Object.assign(course, body);
    await course.save();
    successResponse(res, 200, {
      message: "Course Updated successfully",
      data: course,
    });
  } else {
    return next(new AppError("Course not found", 404));
  }
});
const deleteCourse = asyncHandler(async (req, res, next) => {
  const { slug } = req.params;
  const course = await Course.deleteOne({ slug });
  if (course) {
    successResponse(res, 204, { message: "Course Deleted successfully" });
  } else {
    return next(new AppError("Course not found", 404));
  }
});
const notificationEvent = require(`${__dirname}/../../events/notificationEventBus.js`);
const createBranchCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const branch = await Branch.findById(id);
  if (
    branch &&
    branch.adminId == req.user.id &&
    req.user.role === "centerAdmin"
  ) {
    const body = req.body;
    const creatableFields = [
      "title",
      "description",
      "category",
      "price",
      "duration",
      "startDate",
      "schedule",
      "capacity",
      "enrolled",
      "requirments",
      "isActive",
      "isFull",
      "instructorDetails",
    ];
    const bodyKeys = Object.keys(body);
    bodyKeys.forEach((el) => {
      if (!creatableFields.includes(el)) {
        delete body[el];
      }
    });
    body.branchId = id;
    const course = await Course.create(body);
    notificationEvent.emit("NewCourseCreated", course);
    return successResponse(res, 201, {
      message: "Course created successfully",
      data: course,
    });
  } else {
    return next(new AppError("Unauthorized action", 403));
  }
});
const getBranchCourses = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const parsedQuery = qs.parse(req.originalUrl.split("?")[1] || "");
  const features = new docuemntFeatures(
    Course.find({ branchId: id }),
    parsedQuery
  )
    .filter()
    .sort()
    .paginate(req)
    .fields();
  const documents = await features.query;
  successResponse(res, 200, {
    data: { results: documents.length, page: req.page, documents },
  });
});

module.exports = {
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  getBranchCourses,
  createBranchCourse,
};
