const cookieParser = require("cookie-parser");
const express = require("express");

const app = express();
require("dotenv").config();

const initCon = async ()=>{
    try{
        console.log("Mongo URI:", process.env.MONGO_CONNECT);
        await main();

        console.log("MongoDB Connected");

        const PORT = process.env.PORT || 4000;
        app.listen(PORT,()=>{
            console.log(`Server Running At Port : ${PORT} `)
        })

    }catch(error){
        console.log("Error in Server Connection"+error);
    }
}

initCon()