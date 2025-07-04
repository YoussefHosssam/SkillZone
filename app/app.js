const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser");
const sanitizeMiddleware = require(`${__dirname}/../middlewares/sanitizeInput.js`);
const session = require("express-session");
const passport = require("passport");

// Handle uncaught exceptions first (sync code errors)
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception!");
  console.error(err.name, err.message);
  process.exit(1);
});

// Load env vars
dotenv.config({ path: `${__dirname}/../.env` });
require("../config/passport.js"); // 🔁 Make sure you load this!
const { connect } = require("../config/dbConnection");
const globalErrorHandler = require("../utils/globalErrorHandler");
// const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(sanitizeMiddleware);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "S3cr3t_Ke7",
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false }, // true only if you're using HTTPS
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: "sessions",
      ttl: 14 * 24 * 60 * 60, // Optional: 14 days
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Routes
const authRouter = require(`${__dirname}/../routes/authRoutes.js`);
const centerRouter = require(`${__dirname}/../routes/centerRoutes.js`);
const userRouter = require(`${__dirname}/../routes/userRoutes.js`);
const branchRouter = require(`${__dirname}/../routes/branchRoutes.js`);
const instructorRouter = require(`${__dirname}/../routes/instructorRoutes.js`);
const courseRouter = require(`${__dirname}/../routes/courseRoutes.js`);
const studentRouter = require(`${__dirname}/../routes/studentRoutes.js`);
const notificationRouter = require(`${__dirname}/../routes/notificationRoutes.js`);
const { undefinedRoute } = require(`${__dirname}/../utils/specificErrors`);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/centers", centerRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/branches", branchRouter);
app.use("/api/v1/instructors", instructorRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/notifications", notificationRouter);
// Handle undefined routes (404)
app.all("/{*any}", undefinedRoute);

// Global Error Handler
app.use(globalErrorHandler);
// Start DB connection
connect();

// Handle rejected promises (async errors)
process.on("unhandledRejection", (err) => {
  console.error("💥 Unhandled Rejection!");
  console.error(err);
  process.exit(1);
});

module.exports = app;
