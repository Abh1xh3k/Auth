import config from '../config/config.js'
import jwt from 'jsonwebtoken'
export const protect=async(req,res,next)=>{
    try{
       const authHeader=req.headers.authorization;
       console.log(authHeader)
       if(!authHeader){
        return res.status(401).json({Message:"No token found"});
       }

      //  const token=authHeader.split(" ")[1];
            const token=authHeader

       const decode =jwt.verify(token,config.JWT_SECRET);
       req.userId=decode.userId;
       next();
    }
    catch(err){
       console.log(err);
       return res.status(500).json({Message:"Internal server Error"});
    }
}