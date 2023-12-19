const express=require('express');
const User=require('C:/Users/DELL/inotebook/backend/models/User.js');
const router=express.Router();
const{body,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const fetchUser=require('../middleware/fetchUser');
const JWT_SECRET="Pravi&#@";
//Create a  User using :POST "/api/auth/createUser" . No login required
router.post('/createUser',[
    body('name','Enter a valid name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must contain atleast 5 characters').isLength({min:5}),
],async(req,res)=>{
    let success=false;
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({success:success,errors:errors.array()});
   }
   //Check whether the user already exists with that email
   try{
    
   let user=await User.findOne({email:req.body.email});
   if(user){
    return res.status(400).json({success:success,error:"Sorry a user with this email already exists"})
   }
   const salt=await bcrypt.genSalt(10);
   const secPass=await bcrypt.hash(req.body.password,salt);
   
    user=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:secPass
   });
   const data={
    user:{
         id:user.id
    }
   }
   success=true;
   const authToken=jwt.sign(data,JWT_SECRET);
   //.then(user=>res.json(user))
   //.catch(err=>console.log(err));
    res.status(200).json({success:success,user});}catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})
//user login using :POST "/api/auth/login" . No login required
router.post('/login',[
   body('email','Enter a valid email').isEmail(),
    body('password','Password cant be blank').exists(),
],async(req,res)=>{
    let success=false;
    const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({success,errors:errors.array()});
   }
   
   const {email,password}=req.body;
   try{
    let user=await User.findOne({email});
    if(!user){
        return res.status(400).json({success,error:"Please try to login with correct credentials"})
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({success,error:"Please try to login with correct credentials"});
    }
    const data={
        user:{
             id:user.id
        }
       }
       success=true;
       const authToken=jwt.sign(data,JWT_SECRET);
       res.json({success,authToken});
   }catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
   }

})
//Get logged in user details using :POST "/api/auth/getUser" . Login required
router.post('/getUser',fetchUser,async(req,res)=>{
try{
    const userId=req.user.id;
    const user=await User.findById(userId).select("-password");
    res.send(user);
}catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
}
})
module.exports=router
