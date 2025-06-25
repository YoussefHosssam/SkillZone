const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);  
const asyncHandler = require('express-async-handler');
const Center = require(`${__dirname}/../../models/center/centerModel.js`)
const centerFeatures = require(`${__dirname}/centerFeatures.js`)
const {successResponse} = require(`${__dirname}/../../utils/successResponse.js`)
const qs = require ('qs')




const getAllCenters = asyncHandler(async (req , res , next)=>{
    const parsedQuery = qs.parse(req.originalUrl.split('?')[1] || '');
    console.log(parsedQuery)
    const features = new centerFeatures(Center.find(),parsedQuery).filter().sort().paginate(req).fields()
    const centeres = await features.query 
    successResponse(res , 200 , {data : {results : centeres.length , page : req.page , centeres}} )
})
const getSingleCenter = asyncHandler(async (req , res , next)=>{
    const id = req.params.id ;
    const center = await Center.findById(id)
    if(center){
        successResponse(res , 200 , {data : {result : center.length , center} } )
    }
    else{
        return next(new AppError("No center found") , 404)
    }
})
const CreateCenter = asyncHandler(async (req , res , next)=>{
    const {name , description , website , categories , contact , socialMedia} = req.body
    const id = req.user.id ;
    if (req.user.role === "centerAdmin"){
        const center = await Center.create({name , description , id , website , categories , contact , socialMedia })
        center.isActive = undefined 
        center.__v = undefined 
        const centerObj = center.toObject();
        delete centerObj._id;
        successResponse(res , 201 , {message : "Center created successfully" , data : centerObj } )
    }
    else{
        return next(new AppError("Unauthorized action") , 403)
    }
})
const deleteCenter = asyncHandler(async (req , res , next)=>{

})
const updateCenter = asyncHandler(async (req , res , next)=>{

})







module.exports = {getAllCenters , getSingleCenter , CreateCenter , deleteCenter , updateCenter}