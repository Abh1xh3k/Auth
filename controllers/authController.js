import User from "../models/User.js"
import crypto from "crypto"
import jwt from 'jsonwebtoken'
import { sendEmailVerification, sendPasswordReset } from '../service/emailService.js'
import { generateaccesstoken, generaterefreshtoken } from '../utils/jwt.js'
import config from '../config/config.js'


export const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "please enter all the details" })
        }
        const exist = await User.findOne({ username });
        if (exist) {
            return res.status(400).json({ message: "User Already Exist" })
        }
        const newUser = await User.create({
            username: username,
            email: email,
            password: password,
            isEmailVerified: false
        })

        const Token = crypto.randomBytes(32).toString("hex");
        newUser.emailVerificationToken = Token;
        newUser.VerificationTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

        await newUser.save();
        await sendEmailVerification(email, Token);
        return res.status(201).json({ Message: "Email sent" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });

    }
}

export const VerifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ Message: " no token found" });
        }
        const user = await User.findOne({
            emailVerificationToken: token,
            VerificationTokenExpiry: { $gt: new Date() }
        })
        if (!user) {
            return res.status(400).json({ Message: "User does not exist" });
        }
        user.isEmailVerified = true;
        user.emailVerificationToken = null;
        user.VerificationTokenExpiry = null;
        await user.save();
        return res.status(200).json({ Message: "Email verified" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "server failed" });
    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter all the credentials" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        if (!user.isEmailVerified) {
            return res.status(403).json({ message: "Please verify your email" });
        }
        const accessToken = generateaccesstoken(user._id);
        const refreshToken = generaterefreshtoken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            accessToken,
            user: {
                id: user._id,
                email: user.email,
            },
            Message: "Login Successful",
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

export const RefreshToken = async (req, res) => {
    try {
        const refreshtoken = req.cookies.refreshToken;
        // console.log( "No token " , refreshtoken);
        if (!refreshtoken) {
            return res.status(400).json({ Message: "No token found" });
        }

        const decode = jwt.verify(refreshtoken, config.JWT_REFRESH_SECRET);

        const newAccessToken = generateaccesstoken(decode.userId);
        return res.status(200).json({ accessToken: newAccessToken });
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ Message: "Invalid refresh Token" });
    }
}
export const ForgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ Message: "User not found" });
        }
        const ResetToken = crypto.randomBytes(32).toString("hex");
        user.passwordResetToken = ResetToken;
        user.passwordResetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);
        await user.save();
        await sendPasswordReset(email, ResetToken);
        return res.status(201).json({ Message: "email sent" });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ Message: "Server Error" });
    }
}

export const PasswordReset = async (req, res) => {
    try {
        const { token } = req.query;
        const { password } = req.body;
        if (!token || !password) {
            return res.status(400).json({ Message: "Token or password missing" });
        }
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetTokenExpiry: { $gt: new Date() }
        })
        if (!user) {
            return res.status(400).json({ Message: "Invalid Token" });
        }
        user.password = password;
        user.passwordResetToken = null;
        user.passwordResetTokenExpiry = null;

        await user.save();

        return res.status(200).json({ Message: "Password reset successful" });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ Message: "server Error" })
    }
}

export const deleteProfile = async(req, res)=>{
    try{

        const user = req.body.userId;
        const result = await User.findByIdAndDelete(user);
        if(result){
            return res.status(200).json({status:true})
        }

    }catch(e){
        return res.send("error occured")
    }
}


export const assignRole = async(req, res)=>{
    try{

        const {userId, role} = req.body;
        const user = await User.findById(userId);
        user.role = role;
        await user.save();
        return res.status(201).json({success:true, msg:"Role assigned Succesfully"})

    }catch(e){
        console.log(e)
        return res.status(400).json({success:false, msg:"Error occured"})
    }   
}