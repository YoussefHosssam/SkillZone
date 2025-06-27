const express = require("express");
const router = express.Router();
const {
  getSingleUser,
  updateUser,
  updateUserPassword,
  updateUserEmail,
} = require(`${__dirname}/../controllers/user/userControllers.js`);
const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);

//User Routes
router.route("/me").get(protect, getSingleUser).patch(protect, updateUser);
router.route("/me/change-password").patch(protect, updateUserPassword);
router.route("/me/change-email").patch(protect, updateUserEmail);
module.exports = router;
