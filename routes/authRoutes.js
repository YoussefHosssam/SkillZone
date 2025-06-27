const router = require("express").Router();
const {
  authUserRegister,
  authUserLogin,
  authUserverifyEmail,
  authUserForgotPassword,
  authUserResetPassword,
  authUserRefreshToken,
  authUserlogOut,
} = require(`${__dirname}/../controllers/auth/authControllers.js`);
const {
  protect,
  isAlreadyLoggedIn,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);

router.route("/register").post(isAlreadyLoggedIn, authUserRegister);
router.route("/login").post(isAlreadyLoggedIn, authUserLogin);
router.route("/verify-email/:token").post(authUserverifyEmail);
router
  .route("/forgot-password")
  .post(isAlreadyLoggedIn, authUserForgotPassword);
router
  .route("/reset-password/:token")
  .post(isAlreadyLoggedIn, authUserResetPassword);
router.route("/refresh-token").post(authUserRefreshToken);
router.route("/logout").post(protect, authUserlogOut);

module.exports = router;
