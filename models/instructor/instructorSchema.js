const mongoose = require ('mongoose')
const validator = require('validator')
const instructorSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , "Instructor name is required"]
    },
    bio : {
        type : String,
        required : [true , "Instructor bio is required"]
    },
    specialties : [String],
    contactEmail : {
        type : String,
        required : [true , "Instructor email is required"],
        validate : [validator.isEmail , "Invalid email"]
    },
    socialMedia : {
        linkedIn : String,
        twitter : String
    },
    centerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'centers'
    },
    isActive : {
        type : Boolean ,
        default : true 
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: Date,    

})

module.exports = instructorSchema 