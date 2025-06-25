const express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const authRouter = require (`${__dirname}/../routes/authRoutes.js`)
const centerRouter = require (`${__dirname}/../routes/centerRoutes.js`)

// Handle uncaught exceptions first (sync code errors)
process.on('uncaughtException', err => {
  console.error('💥 Uncaught Exception!');
  console.error(err.name, err.message);
  process.exit(1);
});

// Load env vars
dotenv.config({ path: `${__dirname}/../.env` });

const { connect } = require('../config/dbConnection');
const globalErrorHandler= require('../utils/globalErrorHandler');
const { undefinedRoute } = require('../utils/specificErrors');
// const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/api/v1/auth' , authRouter)
app.use('/api/v1/centers' , centerRouter)
// Handle undefined routes (404)
app.all('/{*any}', undefinedRoute);

// Global Error Handler
app.use(globalErrorHandler);
// Start DB connection
connect();

// Handle rejected promises (async errors)
process.on('unhandledRejection', err => {
  console.error('💥 Unhandled Rejection!');
  console.error(err);
  process.exit(1);
});

module.exports = app;
