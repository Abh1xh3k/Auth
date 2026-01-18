import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export const generateaccesstoken=(userId)=>{
  return jwt.sign(
    {userId
    },
    config.JWT_SECRET,
    {expiresIn:"15m"}
  );
};
export const generaterefreshtoken=(userId)=>{
  return jwt.sign(
    {userId},
    config.JWT_REFRESH_SECRET,
    {expiresIn:"7d"}
  );
};