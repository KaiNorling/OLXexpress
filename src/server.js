
const express = require("express")
const path = require("path")
const PORT = process.env.PORT || 2000
const cp = require("cookie-parser")
const morgan = require("morgan")
const efu = require("express-fileupload")
const cookieParser = require("cookie-parser")
// const routes = require("./routes/routes")
const mongo = require("../src//modules/mongoose")
const UserMiddleware = require("./middlewares/UserMiddleware")

const routes = require("./routes/routes")
const { addErrorHandler } = require("./middlewares/errorHandler")


//const UserMiddleware = require("./middlewares/UserMiddleware")
// const databaseMiddleware = require("./middlewares/databaseMiddleware")






async function server(mode) {
    const server = express()
    server.listen(PORT, ()=>console.log(`SERVER RUNNING AT ${PORT}`))
    try {
       

        //MIDDLEWARES
        server.use(express.json())
        server.use(express.urlencoded({extended: true }))
        // server.use(morgan("dev"))
        server.use(cookieParser())
        // server.use(databaseMiddleware)
        //STATIC FOLDER
        server.use(express.static(path.join(__dirname, "public")))
        server.use(UserMiddleware)
       
        await mongo();
        server.use(addErrorHandler)
        //SETTINGS
        
        server.set('view engine', 'ejs');    
        server.set('views', __dirname + '/views');

        if(mode =="DEV"){server.use(morgan("dev"))}



    } finally {

    routes(server)

        // routes(server)

    }
}

module.exports=server;


/////////////////////////

// (async () => {
//     const db = await mongodb();
//     try {
//         await server.use((req, res, next) => {
//             req.db = db;
//             next();
//         });
//         // await server.use(UserMiddleware)
//     } catch (error) {
//         console.log(error);
//     } finally {
//         await routes(server);
//     }
// })();


