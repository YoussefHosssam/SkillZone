const mongoose = require('mongoose')
const centerSchema = require (`${__dirname}/centerSchema.js`)

centerSchema.pre(/^find/, function (next) {
  this.select('-__v');
  next();
});

const Center = mongoose.model('centers' , centerSchema);
module.exports = Center
