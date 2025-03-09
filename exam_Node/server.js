require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const morgan=require('morgan')
const cors=require('cors')

const authRoutes=require("./routes/auth")
const userRoutes=require("./routes/users")

const app=express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use('/uploads',express.static('uploads'))

//routes

app.use('/auth',authRoutes)
app.use('/users',userRoutes)

//connect to the mongodb

mongoose
.connect(process.envMonGo_URL,{useNewUrlParse:true,useUnifiedTopology:true})
.then(()=>{
    console.log("MongoDB Connected")
    app.listen(5000,()=> console.log("server running on port 5000"))
    .catch(err)=>console.log(err)
})