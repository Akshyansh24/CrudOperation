const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/crudoperation").then(()=>{
    console.log("Connection Succesfully");
}).catch((e)=>{
    console.log(e);
})