const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://akxshs234:VQwPGdDYCE5FJy8C@cluster0.azct3yz.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connection Succesfully");
}).catch((e)=>{
    console.log(e);
})