const mongoose = require("mongoose");
const slugify = require("slugify");
const courseSchema = require(`${__dirname}/courseSchema.js`);
courseSchema.index({ title: 1, branchId: 1 }, { unique: true });
courseSchema.pre("save", function (next) {
  if (
    this.isNew ||
    this.isModified("title") ||
    this.isModified("instructorDetails")
  ) {
    this.slug = slugify(`${this.title}`);
    this.instructorDetails.fullnameSlug = slugify(
      `${this.instructorDetails.fullname}`
    );
  }
  next();
});

const courseModel = new mongoose.model("courses", courseSchema);
module.exports = courseModel;
