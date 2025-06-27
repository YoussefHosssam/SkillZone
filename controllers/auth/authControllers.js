const User = require(`${__dirname}/../../models/user/userModel.js`);
const sendEmail = require(`${__dirname}/../../utils/sendEmail.js`);
const {
  generateTokens,
} = require(`${__dirname}/../../services/authServices.js`);
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { checkToken } = require(`${__dirname}/../../services/authServices.js`);
const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const { deleteTokens } = require(`${__dirname}/../../services/authServices.js`);
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);

const authUserRegister = asyncHandler(async (req, res, next) => {
  const { username, email, phone, password, confirmPassword, role } = req.body;
  if (role.toLowerCase() === "admin") {
    return next(
      new AppError("Invalid registration information. Please try again.", 400)
    );
  }
  const newUser = User({
    username,
    phone,
    email,
    password,
    confirmPassword,
    role,
  });
  const token = await newUser.createEmailToken();
  await newUser.save();
  const verifyLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/verify-email/${token}`;
  try {
    sendEmail({
      from: process.env.EMAIL_MAIL,
      to: email,
      subject: "Verfiy email link",
      message: `Your verfiy email link ${verifyLink} `,
    });
  } catch (err) {
    return next(
      new AppError("Something went wrong , Please try again later", 500)
    );
  }
  newUser.password = undefined;
  newUser.verificationToken = undefined;
  newUser.emailVerified = undefined;
  newUser.__v = undefined;
  newUser._id = undefined;
  successResponse(res, 201, {
    message: "User created successfully. A verification email has been sent.",
    data: newUser,
  });
});

const authUserLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid email or password", 400));
  }
  if (!user.emailVerified) {
    return next(
      new AppError("Please verify your email address before logging in", 403)
    );
  }

  const { accessToken, refreshToken } = generateTokens(user._id, user.role);
  user.updateLastLogin();

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  successResponse(res, 200, {
    message: "User logged in successfully",
    data: {
      id: user._id,
      role: user.role,
    },
  });
});

const authUserverifyEmail = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    verificationToken: hashedToken,
  });
  if (user) {
    user.verificationToken = undefined;
    user.emailVerified = true;
    await user.save({ validateBeforeSave: false });
    successResponse(res, 200, { message: "Email verified successfully" });
  } else {
    return next(new AppError("Invalid token", 400));
  }
});

const authUserForgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    try {
      const token = user.createRandomToken();
      await user.save({ validateBeforeSave: false });
      const resetLink = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/auth/reset-password/${token}`;
      sendEmail({
        from: process.env.EMAIL_MAIL,
        to: email,
        subject: "Reset Password recovery link",
        message: `Your reset password link ${resetLink} `,
      });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(
        new AppError(
          "Something went wrong while sending email please try again later",
          500
        )
      );
    }
    successResponse(res, 200, { message: "Reset URL sent successfully" });
  } else {
    return next(new AppError("Invalid email", 404));
  }
});
const authUserResetPassword = asyncHandler(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (user) {
    const { password, confirmPassword } = req.body;
    user.password = password;
    user.confirmPassword = confirmPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    successResponse(res, 200, { message: "Password reset successfully" });
  } else {
    return next(new AppError("Invalid token or expired", 400));
  }
});
const authUserRefreshToken = asyncHandler(async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    next(new AppError("Invalid token. Please log in again.", 401));
  }
  const { valid, decoded } = await checkToken(refreshToken, "REFRESH");
  if (valid) {
    const newaccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: process.env.JWT_ACCESS_EXPIRE }
    );
    res.cookie("accessToken", newaccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    successResponse(res, 200, { message: "Token refresh successfully" });
  } else {
    next(new AppError("Invalid token. Please log in again.", 401));
  }
});

const authUserlogOut = asyncHandler(async (req, res, next) => {
  deleteTokens(res);
  successResponse(res, 200, { message: "User logged out successfully" });
});
module.exports = {
  authUserRegister,
  authUserLogin,
  authUserverifyEmail,
  authUserForgotPassword,
  authUserResetPassword,
  authUserRefreshToken,
  authUserlogOut,
};
