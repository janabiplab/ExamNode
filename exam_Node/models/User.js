const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
    role:{type:String,enum:['user','admin','guest'],default:'user'},
    profilePic:{type:string,default:""}
})

module.exports=mongoose.model("User",UserSchema)