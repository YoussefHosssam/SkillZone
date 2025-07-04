const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);
const User = require(`${__dirname}/../../models/user/userModel.js`);
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);
const addStudentInformation = asyncHandler(async (req, res, next) => {
  const body = req.body;
  const userId = req.user.id;
  const creatableFields = [
    "studentInformation"
  ];
  const bodyKeys = Object.keys(body);
  bodyKeys.forEach((el) => {
    if (!creatableFields.includes(el)) {
      delete body[el];
    }
  });
  const user = await User.findByIdAndUpdate({ _id: userId }, body, {
    new: true,
    runValidators: true,
  });
  if (user) {
    successResponse(res, 200, {
      message: "Student information updated successfully",
      data: user.studentInformation,
    });
  } else {
    return next(new AppError("Unauthorized action", 403));
  }
});
module.exports = {
  addStudentInformation,
};
