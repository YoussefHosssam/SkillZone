const AppError = require(`${__dirname}/../../utils/errorHandleClass.js`);  
const asyncHandler = require('express-async-handler');
const docuemntFeatures = require(`${__dirname}/../../utils/apiFeatures.js`)
const qs = require ('qs')
const {successResponse} = require(`${__dirname}/../../utils/successResponse.js`)
const Branch = require(`${__dirname}/../../models/branch/branchModel.js`)
const Center = require(`${__dirname}/../../models/center/centerModel.js`)
const {getAllDocuments , getSingleDocument , deleteDocument , updateDocument} = require(`${__dirname}/../factoryHandler.js`)


const getAllBranches = asyncHandler(async(req , res ,next)=>{
    const centerId = req.params.id
    const parsedQuery = qs.parse(req.originalUrl.split('?')[1] || '');
    const features = new docuemntFeatures(Branch.find({centerId}),parsedQuery).filter().sort().paginate(req).fields()
    const documents = await features.query 
    successResponse(res , 200 , {data : {results : documents.length , page : req.page , documents}} )
})

const createBranch = asyncHandler(async(req , res ,next)=>{
    const centerId = req.params.id
    const userId = req.user.id ; const userRole = req.user.role
    const center = await Center.findById(centerId)
    if(center.ownerId == userId && userRole === "centerAdmin"){
        const {name , address , geoLocation , phone , operatingHours} = req.body
        const branch = await Branch.create({name , address , geoLocation , phone , operatingHours , centerId})
        branch.isActive = undefined ; branch.__v = undefined ;
        successResponse(res , 201 , {message : "Branch created successfully." , data : branch} )
    }
    else{
        return next(new AppError("Unauthorized action" , 403))
    }
})

const getSingleBranch = asyncHandler (async (req , res , next)=>{
    
})
const updateBranch = asyncHandler (async (req , res , next)=>{

})
const deleteBranch = asyncHandler (async (req , res , next)=>{

})

const getNearbyBranches = asyncHandler (async (req , res , next)=>{

})

module.exports = {getAllBranches , createBranch , getSingleBranch , updateBranch , deleteBranch , getNearbyBranches} 
