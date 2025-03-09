const jwt=require('jsonwebtoken')
const verifyToken=(req,res,next)=>{
    const token =req.headers.authorization?.split(" ")[1]
    if (!token){
        return res.status(401).json({message:Unothorised})
    }
    try{ 
        const decoded=jwt.verify(toekn,process.env.JWT_SECRET) 
        req.user=decoded 
    }  
    catch(error){
        res.sttus(401).json({error:error})
    }  
}

const checkRole=(roles)=>(req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return res.status(403).json({message:'Access denied'})
    }
    next()
}

module.exports={verifyToken,checkRole}