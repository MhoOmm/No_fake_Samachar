const mongoose = require("mongoose");

exports.connect = async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB connected sucess"))
    .catch((error)=>{
        console.log("DB connected failed");
        console.error(error);
        process.exit(1);
    })
};