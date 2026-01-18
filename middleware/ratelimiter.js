import ratelimiter from 'express-rate-limit';

export const limiter = ratelimiter({
   windowMs: 15 * 60 * 1000, 
   max: 5,
   standardHeaders: true,    
   legacyHeaders: false,      
   message: "Too many requests from this IP, try after 15 min",
});