const courseCategories = [
  "Programming",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Languages",
  "Music",
  "Photography",
  "Artificial Intelligence",
  "Personal Development",
  "Finance & Accounting",
  "Health & Fitness",
  "Engineering",
  "Cybersecurity",
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
const centerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Center name is required"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Center description is required"],
  },
  ownerId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  website: { type: String, validate: [validator.isURL, "Invalid Website URL"] },
  categories: {
    type: [String],
    enum: courseCategories,
  },
  contact: {
    email: { type: String, validate: [validator.isEmail, "Invalid email"] },
    phone: {
      type: String,
    },
    address: String,
  },
  socialMedia: {
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
  },
  numberOfBranches: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,
});
module.exports = centerSchema;
