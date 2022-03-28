const {handleErrorCheck} = require("../middlewares/errorHandler.js");
// const notFoundMiddleware = require("../middlewares/NotFoundMiddleware.js");
const server = require("../server.js")
const AdsR = require("./AdsR.js")
const CategoryR = require("./CategoryR");
const HomeR = require("./HomeR");
const MessagesR = require("./MessagesR.js");
const UserR = require("./UserR");
const notFoundMiddleware=require("../middlewares/NotFoundMiddleware")



module.exports = function routes(server) {
    try {
        server.use(HomeR.path, HomeR.router);
        server.use(UserR.path, UserR.router);
        server.use(CategoryR.path, CategoryR.router);
        server.use(AdsR.path, AdsR.router);
        server.use(MessagesR.path, MessagesR.router);

    } finally {

        server.use(handleErrorCheck);
       server.use(notFoundMiddleware)

    }

}


// module.exports=routes;



// module.exports=(server)=>{

//     server.use(HomeR.path, HomeR.router)
//      server.use(UserR.path, UserR.router)
//      server.use(CategoryR.path, CategoryR.router)
//      server.use(AdsR.path, AdsR.router)
//      server.use(MessagesR.path, MessagesR.router)


// }



// const routes =function(server){
//         try {
//         server.use(HomeR.path, HomeR.router);
//         server.use(UserR.path, UserR.router);
//           server.use(CategoryR.path, CategoryR.router);
//           server.use(AdsR.path, AdsR.router);
//          server.use(MessagesR.path, MessagesR.router);

//     } finally {

//           server.use(handleErrorCheck);

//     }
// }