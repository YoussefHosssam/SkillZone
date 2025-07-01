const mongoose = require ('mongoose')
const courseSchema = new mongoose.Schema({
    branchId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'branches'
    },
    title : {
        type : string , 
        required : [true , "Course title is required"],
        unique : true
    },
    description : String,
    category : {
        type : String ,
        required : true,
        enum : ["IT" , "Cyber Security" , "Programming" , "DevOps" , "Web Development" , "Flutter" , "Mobile Development"]

    },
    price : Number,
    duration : String ,
    startDate : Date ,
    schedule : [
        {
            day :{
                type : String,
                required : true  
            },
            time :{
                type : String,
                required : true  
            }
        }
    ],
    capacity : {
        type : Number,
        required : [true , "Course capacity is required"]
    },
    enrolled : Number,
    requirments : [String],
    isActive : {
        type : Boolean ,
        default : true 
    },
    isFull  :{
        type : Boolean,
        default : false,
    },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: Date,
})

module.exports = courseSchema 