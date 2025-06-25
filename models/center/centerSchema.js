const mongoose = require('mongoose');
const validator = require('validator')
const centerSchema = mongoose.Schema({
    name : {
        type : String , 
        required : [true , "Center name is required"],
        unique : true
    },
    description : {
        type : String , 
        required : [true , "Center description is required"]
    },
    ownerId : {
        type : mongoose.Schema.ObjectId,
        ref : "users"
    },
    website : {type : String , validate : [validator.isURL , "Invalid Website URL"]},
    categories : {
        type : Array
    },
    contact: {
        email: { type : String  , validate : [validator.isEmail , "Invalid email"]},
        phone : {type : String /*, validate : [validator.isMobilePhone , "Invalid Phone number"]*/}
    },
    socialMedia : {
        facebook: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
    },
    createdAt : {type : Date , default : Date.now()},
    updatedAt  :Date ,
    isActive : {type : Boolean , default : true}
});
module.exports = centerSchema 