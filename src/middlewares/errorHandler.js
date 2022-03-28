
const { response } =require ("express");
const { ErrorHandler, handleError } =require("../helper/errorHandler") ;

// module.exports =function addErrorHandler(req,res,next){

//     response.error=ErrorHandler;
//     next()

// }


// module.exports = function handleErrorCheck(error,req,res,next){
//     handleError(err,res);
// }

function addErrorHandler(req,res,next){

    res.error=ErrorHandler;
    next()

}


 function handleErrorCheck(err,req,res,next){
    handleError(err,res);
}


module.exports={
  addErrorHandler,handleErrorCheck}
