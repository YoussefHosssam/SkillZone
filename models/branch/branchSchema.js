const mongoose = require('mongoose');
const validator = require('validator')
const branchSchema = mongoose.Schema({
    centerId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "centers",
        required : [true , "A branch must be associated with a center."]
    },
    name : {
        type : String ,
        required : [true , "A branch must have a name."]
    },
    address : {
        street : {
            type : String ,
            required : [true , "A branch address must have street"]
        },
        city : {
            type : String ,
            required : [true , "A branch address must have city"]
        },
        postalCode : {
            type : String ,
            required : [true , "A branch address must have postalCode"]
        },
        country : {
            type : String ,
            default : "Egypt"
        }
    },
    geoLocation : {
        type : {
            type : String ,
            default : "Point",
            enum : ["Point"]
        },
        coordinates: {
            type: [Number],
            required: [true, 'Coordinates are required']
        }
    },
    phone : {
        type : String,
        required : [true , "A branch must have phone number"]
    },
    operatingHours : [{
        day : String ,
        start : String ,
        close : String ,
    }],
    createdAt : {
        type : Date,
        default : Date.now()
    },
    updatedAt : {
        type : Date
    },
    isActive : {
        type : Boolean,
        default : true
    }
})

module.exports = branchSchema