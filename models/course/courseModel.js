const mongoose = require("mongoose");
const slugify = require("slugify");
const courseSchema = require(`${__dirname}/courseSchema.js`);
courseSchema.index({ name: 1, branchId: 1 }, { unique: true });
courseSchema.pre("save", async (next) => {
  if (
    this.isNew ||
    this.isModified("title") ||
    this.isModified("instructorDetails")
  ) {
    this.slug = slugify(`${this.title}`);
    this.fullnameSlug = slugify(`${this.fullname}`);
    await this.save();
  }
  next();
});

const courseModel = new mongoose.model("courses", courseSchema);
module.exports = courseModel;
