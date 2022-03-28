


module.exports =  function notFoundMiddleware(req, res, next) {
    res.status(404).json({
        ok:false,
        message:"Not Found",

    })

};
