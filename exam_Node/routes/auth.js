const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require("./models/User")

const router=express.Router()
const SECRET_KEY=process.env.JWT_SECRET

//for signup of user

router.post('/signup',async(req,res)=>{
    try{
        const {username,email,password,role}=req.body
        const hasedPassword=await bcrypt.hash(password,10)
        const user=new User({username,email,password:hasedPassword,role})
        await user.save()

        res.status(201).json({message:"signup sucessful"})

    }
    catch(err){
        res.status(500).json({error:err})
    }
})

//for login

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        
        if (!user || (await bcrypt.compare(password,user.password))){
            res.status(500).json({message:"user connot find"})
        }

        const token=jwt.sign({id:user_id,role:user.role,SECRET_KEY,expiresIn:'1h'})
        res.json({token})

    }
    catch(error){
        res.status(500).json({error:error})
    }
})
module.exports=router