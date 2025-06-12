const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/Resort").then(()=>{
    console.log("connection is succesful");
}).catch((e)=>{
    console.log("connection is not sucessful");
})