const courseCategories = [
  "Programming",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Languages",
  "Music",
  "Photography",
  "Personal Development",
  "Finance & Accounting",
  "Health & Fitness",
  "Engineering",
  "School Subjects",
  "Test Preparation",
  "Art & Craft",
  "Beauty & Makeup",
  "Cooking",
  "Sports & Athletics",
  "Software Tools",
  "Cyber Security",
  "Networking",
  "Game Development",
  "AI & Machine Learning",
  "Cloud Computing",
  "Entrepreneurship",
];
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
  //if student
  studentInformation: {
    ssn: String,
    birthDate: String,
    gender: {
      type: String,
      enum: ["Male", "Female"],
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      country: {
        type: String,
        default: "Egypt",
      },
    },
    interestings: {
      type: String,
      enum: courseCategories,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = userSchema;
