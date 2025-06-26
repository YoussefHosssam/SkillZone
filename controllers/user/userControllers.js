const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);  
const asyncHandler = require('express-async-handler');
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`)
const qs = require ('qs')
const {successResponse} = require(`${__dirname}/../../utils/successResponse.js`)
const User = require(`${__dirname}/../../models/user/userModel.js`)

const getSingleUser = asyncHandler (async (req , res , next)=>{
    
})
const updateUser = asyncHandler (async (req , res , next)=>{

})

module.exports = {getSingleUser , updateUser} 
