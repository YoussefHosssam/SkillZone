const mongoose = require("mongoose");
const notificationSchema = require(`${__dirname}/notificationSchema.js`);
const notificationModel = new mongoose.model(
  "notifications",
  notificationSchema
);
module.exports = notificationModel;
