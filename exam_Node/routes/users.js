const express=require('express')
const User=require('./models/User')
const {verifyToken,checkRole}=require('./middleware/multerConfig')

const router=express.Router()
//upload profile picture
router.post('/upload', verifyToken,upload.single("profilePic") ,async(req,res)=>{
    try{
       const user=await User.findByIdAndUpdate(
        req.user.id,
        {profilePic:req.file.path},
        {new:true}
       )
       res.json(user)
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

// update profile picture

router.put("/update",verifyToken,upload.single("profilePic") ,async(req,res)=>{
    try{
       const user=await User.findByIdAndUpdate(
        req.user.id,
        {profilePic:req.file.path},
        {new:true}
       )
       res.json(user)
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

//delete profile picture

router.delete('/delete',verifyToken,async(req,res)=>{
    try{
        const user=await User.findByIdAndUpdate(
            req.user.id,
            {profilePic:""},
            {new:true}
        )
        res.json({message:"Profile picture deleted"},user)
       
    }
    catch(error){
        res.status(500).json({error:error})
    }
})

module.exports=router

