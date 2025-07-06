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
const courseSchema = new mongoose.Schema({
  slug: String,
  branchId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "branches",
  },
  title: {
    type: String,
    required: [true, "Course title is required"],
    unique: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
    enum: courseCategories,
  },
  price: Number,
  duration: String,
  startDate: Date,
  schedule: [
    {
      day: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
  ],
  capacity: {
    type: Number,
    required: [true, "Course capacity is required"],
  },
  enrolled: Number,
  requirments: [String],
  isActive: {
    type: Boolean,
    default: true,
  },
  isFull: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,

  //Instructor details
  instructorDetails: {
    fullname: {
      type: String,
      required: [true, "Instructor name is required"],
      unique: true,
    },
    fullnameSlug: String,
    bio: {
      type: String,
      required: [true, "Instructor bio is required"],
    },
    specialties: [String],
    contactEmail: {
      type: String,
      required: [true, "Instructor email is required"],
      validate: [validator.isEmail, "Invalid email"],
    },
    socialMedia: {
      linkedIn: String,
      twitter: String,
    },
  },
});

module.exports = courseSchema;
