const AppError = require(`${__dirname}/./errorHandleClass.js`);
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};
const undefinedRoute = (req, res, next) => {
  return next(new AppError(`Not found route ${req.originalUrl}`, 404));
};

module.exports = {
  handleCastErrorDB,
  handleDuplicateFieldsDB,
  handleValidationErrorDB,
  undefinedRoute,
};
