import apiError from "../../common/utils/apiError.js";
import User from "./auth.model.js"
import { generateResetToken ,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
 } from "../../common/utils/jwt.utils.js";
import crypto from "crypto"



import { sendEmail , sendResetPasswordEmail , sendVerificationEmail } from "../../common/config/email.js";









const hashing = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex");
}

const register = async ({name , email , password , role}) => {
    const existing = await User.findOne({email})
    if(existing) throw apiError.conflict("Email already exists");

    // token
    const {rawToken , hashedToken} = generateResetToken();
    //send email with raw token

    try {
        await sendVerificationEmail(email , rawToken)
    } catch (err) {
        console.error("Failed to send verification email" , err.message)
    }




    const user = await User.create({
        name , 
        email,
        password,
        role ,
        verificationToken : hashedToken
    })
    

    const userObj = user.toObject();
    delete userObj.password
    delete userObj.verificationToken

    return userObj;

    
    
}

const login = async ({email , password})=> {
    const user = await User.findOne({email}).select("+password");
    if(!user){
        throw apiError.unauthorized("The credentials are incorrect")
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch) throw apiError.unauthorized("The credentials are incorrect") ;

    if(!user.isVerified) throw apiError.forbidden("Kindly verify your Email")

    const accessToken = generateAccessToken({id : user._id , role : user.role})
    const refreshToken = generateRefreshToken({id : user._id})

    user.refreshToken = hashing(refreshToken);
    await user.save({validateBeforeSave : false});

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
}

const logout = async(userId) =>{
    return User.findByIdAndUpdate(userId  , {refreshToken : null})

}

const refresh = async (token) => {
    if(!token) throw  apiError.notfound("No Refresh Token Found");
    const decoded = verifyRefreshToken(token);

    const user = await User.findById(decoded.id).select("+refreshToken");
    if(!user) throw  apiError.forbidden("Please Log in Again")
    if(user.refreshToken !== hashing(token)){
        throw  apiError.forbidden("Log in Again")
    }

    const accessToken = generateAccessToken({id : user._id , role : user.role})
    return {accessToken}
}

const verifyToken = async(token) => {
    const tokenTrim = token.trim();
    const hashedToken = hashing(tokenTrim)
    const user = await User.findOne({verificationToken : hashedToken});

    if(!user) throw apiError.badRequest("No User Found . Try Again");

    await User.findOneAndUpdate(user._id , {
        $set : {isVerified : true} ,
        $unset : {verificationToken : 1},
    })
}

const forgetPassword = async(email) => {
    const user = await User.findOne({email});
    if(!user) throw  apiError.badRequest("No such User found");

    const {rawToken , hashToken} = generateResetToken();
    //send email about the raw token

    user.resetPasswordToken = hashToken
    user.resetPasswordExpiresIn = Date.now() + 15*60*1000
    await user.save();
    //send email
    try {
        await sendResetPasswordEmail(email , rawToken)
    } catch (error) {
        console.error("Unable to send the Email . Try Again" , error.message)
    
    }
}

const resetPassword = async(token , newPassword) => {
    const hashedToken = hashing(token);
    const user = await User.findOne({
        resetPasswordToken : hashedToken,
        resetPasswordExpiresIn : {$gt : Date.now()}
    }).select("+resetPasswordToken +resetPasswordExpiresIn")

    if(!user) throw apiError("Timer Expired or Wrong Password Token")
    user.password = newPassword
    user.resetPasswordExpiresIn = undefined;
    user.resetPasswordToken = undefined;

    await user.save();

}
const aboutMe = async(userId) => {
    const user = await User.findById(userId);
    if(!user) throw apiError.badRequest("No such user is present")
    return user;
}


export {register,
    login,
    logout,
    refresh,
    verifyToken,
    forgetPassword,
    resetPassword,
    aboutMe
}
