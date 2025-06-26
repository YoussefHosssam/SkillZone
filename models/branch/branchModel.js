const mongoose = require('mongoose');
const validator = require('validator')
const branchSchema = require(`${__dirname}/branchSchema.js`)
const Center = require(`${__dirname}/../center/centerModel.js`)

branchSchema.index({ geoLocation: '2dsphere' });

branchSchema.post('save' , async function(){
    const centerId = this.centerId 
    const center = await Center.findById(centerId)
    center.updateBranchesNumber()
})


const Branch = mongoose.model("branches" , branchSchema)
module.exports = Branch 