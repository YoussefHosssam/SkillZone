const successResponse = (res , status , object)=>{
    res.status(status).json({
        status : 'success' ,
        message : object.message ,
        data : object.data 
    })
}

module.exports = {successResponse };
