import User from "../models/User.js";

export const isAdmin = async(req, res ,next)=>{
    try{
        console.log(req.userId)
        const user= await User.findById(req.userId);
        console.log(user)
        if( user.role != "admin")    return res.status(401).json({Message:"Access Denied"}); 
        next();

    }catch(e){
        return res.send("Error occured")
    }
    
}

// export const isModerator= async(req,res,next)=>{
//     try{
//       console.log(req.userId)
//       const user= await User.findById(req.userId); 
//     }
//     catch(e){
     
//     }
// }



