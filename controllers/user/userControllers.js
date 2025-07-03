const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);
const { deleteTokens } = require(`${__dirname}/../../services/authServices.js`);

const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);
const User = require(`${__dirname}/../../models/user/userModel.js`);
const getSingleUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (!user) {
    deleteTokens(res);
    return next(
      new AppError("Invalid or expired token. Please log in again.", 401)
    );
  }
  successResponse(res, 200, {
    message: `${user.username} information`,
    data: { user },
  });
});
const updateUser = asyncHandler(async (req, res, next) => {
  const { username, phone, studentInformation } = req.body;
  const userId = req.user.id;
  const user = await User.findByIdAndUpdate(
    userId,
    { username, phone, studentInformation },
    { new: true, runValidators: true }
  );
  if (!user) {
    return next(
      new AppError("Invalid username. This username is already taken.", 400)
    );
  }
  user.updateLastUpdate();
  successResponse(res, 200, {
    message: `username updated successfully`,
    data: { user },
  });
});
const updateUserPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword, newConfirmPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  const isCorrect = await user.correctPassword(oldPassword, user.password);

  if (!isCorrect) {
    return next(new AppError("Old password is incorrect.", 400));
  }

  if (newPassword !== newConfirmPassword) {
    return next(new AppError("New passwords do not match.", 400));
  }

  user.password = newPassword;
  user.confirmPassword = newConfirmPassword;

  await user.save(); // runs validation, password hashing, etc.

  user.password = undefined;

  successResponse(res, 200, {
    message: "Password updated successfully",
    data: { user },
  });
});

const updateUserEmail = asyncHandler(async (req, res, next) => {});
const deactivateUserAccount = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const user = await User.findByIdAndUpdate(
    { _id: userId },
    { isActive: false }
  );
  if (user) {
    deleteTokens(res);
    successResponse(res, 200, {
      message: "User deactivated successfully",
      data: user.studentInformation,
    });
  } else {
    return next(new AppError("Unauthorized action", 403));
  }
});

module.exports = {
  getSingleUser,
  updateUser,
  updateUserPassword,
  updateUserEmail,
  deactivateUserAccount,
};
