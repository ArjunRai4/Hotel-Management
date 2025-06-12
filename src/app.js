require('dotenv').config();
const express=require("express");
const hbs=require("hbs");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("./db/conn")
const path=require("path");
const app=new express();
const port= process.env.PORT||3000
const Register=require("./models/registers");
const Booking=require("./models/booking");
const cookieParser=require("cookie-parser");
const auth=require("./middleware/auth")

const templatepath=path.join(__dirname,"../template/views");
const partialpath=path.join(__dirname,"../template/partials");
const staticpath=path.join(__dirname,"../public");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static(staticpath));
hbs.registerPartials(partialpath);

app.set('view engine','hbs');
app.set('views',templatepath);

app.get("/home",(req,res)=>{
    res.render("home");
})
app.get("/room",(req,res)=>{
    res.render("room");
})
app.get("/roomview",(req,res)=>{
    res.render("roomview");
})
app.get("/dining",(req,res)=>{
    res.render("dining");
})
app.get("/gallery",(req,res)=>{
    res.render("gallery");
})
app.get("/login",(req,res)=>{
    res.render("login");
})
app.post("/login",async(req,res)=>{
    try{
            const email=req.body.email;
            const password=req.body.password;
            
           const useremail=await Register.findOne({email:email});

           const isMatch=await bcrypt.compare(password,useremail.password);

           const token=await useremail.generateAuthToken();
           res.cookie("jwt",token);
         
           if(isMatch){
            res.status(201).render("book",{
                isLoggedIn: true,
                isSignedIn: true,
                username:useremail.name,
            });
           }
           else{
               res.render("login",{fill:"invalid Credentials"});
           }

    } catch(e){
       res.status(400).send("invalid credentials");
    }
})
app.get("/signin",(req,res)=>{
    res.render("signin");
})
app.post("/signin",async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirm;
        if(password===cpassword){
            const user= new Register({
                name: req.body.name,
                email: req.body.email,
                password:req.body.password,
                confirm:req.body.confirm,
            })
         
            const token=await user.generateAuthToken();
            res.cookie("jwt",token);
            const registered= await user.save();
            
            res.status(201).render("book",{
                isSignedIn: true,
                isLoggedIn:true,
                username:req.body.name,
            });
        }
        else{ 
            res.render("signin",{
            fill: "Passwords are not matching"
        })};
    }catch(e){
        res.render("signin",{
            fill:"You are already signed Up"
        })
        
    }
})
app.get("/logout",auth,async(req,res)=>{
    try {
        req.user.tokens=req.user.tokens.filter((curElm)=>{
            return curElm.token !== req.token;
        })
        res.clearCookie("jwt");
        res.render("book",{
            isLoggedIn:false,
        });
        await req.user.save();
    } catch (error) {
        res.render("book");
    }
    
})
app.get("/book",(req,res)=>{
    res.render("book");
})
app.post('/book',  (req, res) => {
        const newBooking = new Booking(req.body);
        newBooking.save() 
        res.render("confirmation",{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            checkIn:req.body.checkIn,
            checkOut:req.body.checkOut,
            rooms:req.body.rooms,
            guests:req.body.guests,
            totalAmount:req.body.totalAmount,
        })  
})
app.get("/confirmation.hbs",(req,res)=>{
    res.render("confirmation");
})

app.listen(port,()=>{
    console.log(`listening to the port ${port}`);
})