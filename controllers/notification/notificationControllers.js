const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);
const asyncHandler = require("express-async-handler");
const {
  successResponse,
} = require(`${__dirname}/../../utils/successResponse.js`);
const qs = require("qs");
const app = require("../../app/app");
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`);
const Notification = require(`${__dirname}/../../models/notification/notificationModel.js`);
const User = require(`${__dirname}/../../models/user/userModel.js`);
const notificationEvent = require(`${__dirname}/../../events/notificationEventBus.js`);
notificationEvent.on(
  "NewCourseCreated",
  asyncHandler(async (course) => {
    const courseCategories = Array.isArray(course.category)
      ? course.category
      : [course.category];
    if (!(courseCategories.length === 0)) {
      const interestedUsers = await User.find({
        "studentInformation.interestings": { $in: courseCategories },
      });
      await Promise.all(
        interestedUsers.map((user) =>
          Notification.create({
            userId: user._id,
            type: "New Course added",
            message: `A new course related to your interests has been added: ${course.title}`,
          })
        )
      );
    }
  })
);
const getAllNotifications = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const parsedQuery = qs.parse(req.originalUrl.split("?")[1] || "");
  const features = new docuemntFeatures(
    Notification.find({ userId }),
    parsedQuery
  )
    .filter()
    .sort()
    .paginate(req)
    .fields();
  const notifications = await features.query;
  if (!(notifications.length === 0)) {
    successResponse(res, 200, {
      message: "Notifications found",
      data: notifications,
    });
  } else {
    return next(new AppError("No notification found", 404));
  }
});

module.exports = { getAllNotifications };
