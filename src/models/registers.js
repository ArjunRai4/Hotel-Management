const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const employeeSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type: String,
        required: true,
    },
    confirm:{
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type:String,
            required: true, 
        }
    }]
})
employeeSchema.methods.generateAuthToken= async function(){
    try {
     const token=jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
     this.tokens=this.tokens.concat({token:token});
     await this.save();
     return token;
 } catch (error) {
     console.log(error);
    }
 }
employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){ 
        this.password = await bcrypt.hash(this. password, 10);
        this.confirm = await bcrypt.hash(this. password, 10);
    }
    next();

})
const Register=new mongoose.model("Users",employeeSchema);
module.exports=Register;