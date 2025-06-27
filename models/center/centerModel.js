const mongoose = require("mongoose");
const centerSchema = require(`${__dirname}/centerSchema.js`);

centerSchema.pre(/^find/, function (next) {
  this.select("-__v");
  next();
});

centerSchema.methods.updateBranchesNumber = async function (flag) {
  if (flag) {
    this.numberOfBranches = Math.max(0, (this.numberOfBranches || 0) - 1);
    await this.save();
  } else {
    this.numberOfBranches += 1;
    await this.save();
  }
};

const Center = mongoose.model("centers", centerSchema);
module.exports = Center;
