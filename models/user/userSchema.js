const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    set: (val) => val.replace(/\s+/g, ""), // removes all spaces
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid Email format",
    },
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  password: {
    type: String,
    min: 6,
    required: [true, "Passowrd is required"],
    select: false,
  },
  confirmPassword: {
    type: String,
    min: 6,
    required: [true, "confirm Passowrd is required"],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "password and confirmPassword are mismatch",
    },
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  phone: String,
  role: {
    type: String,
    enum: ["student", "centerAdmin", "admin"],
    default: "student",
  },
  createdAt: { type: Date, default: Date.now() },
  lastUpdate: Date,
  lastLogin: Date,
  passwordUpdatedAt: Date,
});

module.exports = userSchema;
