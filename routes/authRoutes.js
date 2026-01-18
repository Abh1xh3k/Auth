import express from 'express';

const router=express.Router();
import {Signup,VerifyEmail,Login,RefreshToken,PasswordReset,ForgotPassword, deleteProfile, assignRole,} from '../controllers/authController.js'
import { isAdmin } from '../middleware/roleMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/signup',Signup);
router.post('/login',Login);
router.get('/verify-email' , VerifyEmail);
router.post('/forgot-password', ForgotPassword);
router.post('/reset-password' , PasswordReset);
router.post('/refresh-token' , RefreshToken);
router.post('/delete-profile' , protect,isAdmin,deleteProfile)
router.post('/assign-role',  protect,assignRole);

export default router;