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
// const {
// } = require(`${__dirname}/../controllers/auth/oauthControllers.js`);
const passport = require("passport");
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
router.route("/google").get(passport.authenticate("google" , {scope : ["profile" , "email"]}) );
router.get("/google/callback",passport.authenticate("google" , {failureRedirect: "/login"}) , (req , res)=>{
  res.status(201).json({message : "User logged in successfully" , user : req.user})
});


module.exports = router;
