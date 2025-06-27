const { checkToken } = require(`${__dirname}/../services/authServices.js`);
const AppError = require(`${__dirname}/../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const User = require(`${__dirname}/../models/user/userModel.js`);
const { deleteTokens } = require(`${__dirname}/../services/authServices.js`);

const protect = asyncHandler(async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return next(new AppError("You are not logged in! Please log in.", 401));
  }
  const token = accessToken.startsWith("Bearer ")
    ? accessToken.split(" ")[1]
    : accessToken;
  const { valid, decoded } = checkToken(token, "ACCESS");
  if (!valid || !decoded) {
    return next(
      new AppError("Invalid or expired token. Please log in again.", 401)
    );
  }
  const user = await User.findOne({ _id: decoded.id });
  if (user.checkChangedPassword(decoded.iat)) {
    deleteTokens(res);
    return next(
      new AppError("Password has been changed recently , please log in again"),
      401
    );
  }
  req.user = {
    id: decoded.id,
    role: decoded.role,
  };
  next();
});

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission.", 403));
    }
    next();
  };
const isAlreadyLoggedIn = (req, res, next) => {
  console.log(req.cookies.refreshToken);
  if (req.cookies.refreshToken) {
    return next(new AppError("You are already logged in.", 400));
  }
  next();
};

module.exports = { protect, restrictTo, isAlreadyLoggedIn };
