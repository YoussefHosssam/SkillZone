const express = require("express");
const notificationRouter = express.Router();
const {
  getAllNotifications,
} = require(`${__dirname}/../controllers/notification/notificationControllers.js`);
const {
  protect,
  restrictTo,
} = require(`${__dirname}/../middlewares/authMiddlewares.js`);

//User Routes
notificationRouter.route("/").get(protect, getAllNotifications);
module.exports = notificationRouter;
