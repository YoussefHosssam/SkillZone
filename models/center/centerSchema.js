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
    type: String,
    enum: ["IT", "Cyber Security", "Programming", "DevOps", "Web Development", "Flutter", "Mobile Development"],
  },
  contact: {
    email: { type: String, validate: [validator.isEmail, "Invalid email"] },
    phone: {
      type: String /*, validate : [validator.isMobilePhone , "Invalid Phone number"]*/,
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
