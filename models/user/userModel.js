const bcrypt = require("bcrypt");
const crypto = require("crypto");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const userSchema = require(`${__dirname}/userSchema.js`);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  if (!this.isNew) {
    this.passwordUpdatedAt = Date.now() - 1000; // slight delay to prevent token issues
  }
  this.confirmPassword = undefined;
});
userSchema.methods.correctPassword = function (candidatePassword, password) {
  return bcrypt.compare(candidatePassword, password);
};
userSchema.methods.checkChangedPassword = function (jwtokenTimeStamp) {
  if (this.passwordUpdatedAt) {
    const changedTimeStamp = parseInt(
      this.passwordUpdatedAt.getTime() / 1000,
      10
    );
    return changedTimeStamp > jwtokenTimeStamp;
  }
  return false;
};
userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 1000 * 60 * 10;
  return resetToken;
};
userSchema.methods.createEmailToken = function () {
  const emailToken = crypto.randomBytes(32).toString("hex");
  this.verificationToken = crypto
    .createHash("sha256")
    .update(emailToken)
    .digest("hex");
  return emailToken;
};
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = Date.now();
  this.save({ validateBeforeSave: false });
};
userSchema.methods.updateLastUpdate = function () {
  this.lastUpdate = Date.now();
  this.save({ validateBeforeSave: false });
};
const User = mongoose.model("users", userSchema);
module.exports = User;
