

const http = require("http")

module.exports =class ErrorHandler extends Error {
    constructor(code, message){
        super(),
        this.code = code,
        this.message=message;

    }
}

module.exports =function handleError (error,response){
    const {code,message}= error ;
    
    response.status(code || 400).json({
        ok:false,
        message
    })
}


// module.exports={
//     ErrorHandler,handleError
// }