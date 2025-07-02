const mongoose = require ('mongoose')
const notificationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'users'
    },
    type : String,
    message : String ,
    createdAt : {
        type : Date ,
        default : Date.now()}
})
module.exports = notificationSchema