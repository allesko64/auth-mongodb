import apiError from "../../common/utils/apiError.js";
import apiResponse from "../../common/utils/apiResponse.js"
import * as authService from "./auth.service.js"
import cookieParser from "cookie-parser";

const register = async(req , res ) =>{
    const user = await authService.register(req.body)
    apiResponse.created(
        res , 
        "The User is Created Successfully",
        user
    )
}


const login = async (req , res) =>{
    const {user , accessToken , refreshToken } = await authService.login(req.body)

    res.cookie("refreshToken" , refreshToken , {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, 
    })

    apiResponse.ok(
        res , 
        "Successfull Login",
        {user , accessToken}
    )

}

const logout = async(req , res) => {
    await authService.logout(req.user.id)
    res.clearCookie("refreshToken");
    apiResponse.ok(res , "Logged Out Successfully")
}

const refresh = async(req , res) => {
    const token = req.cookies?.refreshToken
    const accessToken = await authService.refresh(token);
    return apiResponse.ok(
        res ,
        "Token Updated",
        {accessToken}
    )
}

const verifyEmail = async(req , res) => {
    await authService.verifyToken(req.params.token);
    apiResponse.ok(res , "Email Verified Successfully")
}
const forgetPassword = async(req , res) => {
    await authService.forgetPassword(req.body.email)
    apiResponse.ok(res , "Reset Password Sent Successfully")
}

const resetPassword = async(req , res) => {
    await authService.resetPassword(req.params.token , req.body.password)
    apiResponse.ok(res , "New Password is Set");
}

const aboutMe = async(req , res) => {
    const user = await authService.aboutMe(req.user.id)
    
    apiResponse.ok(res , "User founded successfully" , user)
}


export {
    register,
    login,
    logout,
    refresh,
    verifyEmail,
    forgetPassword,
    resetPassword,
    aboutMe
}

