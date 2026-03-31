import apiError from "../../common/utils/apiError.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js"

const authenticate = async (req , res , next) =>{
    let token = null ;
    if(req.headers.authourization?.startsWith("Bearer")){
        token = req.headers.authourization.split(" ")[1];
    }
    if(!token) throw apiError.forbidden("Authentication failed")

    const decoded = verifyAccessToken(token);
    const user = await User.findById(decoded.id);
    if(!user) throw apiError("Authentication Unsuccessfull");

    req.user = {
        id : user._id,
        name : user.name ,
        email : user.email,
        role : user.role
    }
    next()
}


const authorize = (...roles) => {
    return (req, res , next) => {
        if(!roles.includes(req.user.role)){
            throw apiError("Unauthorized Access")
        }
        next()
    }
    
}

export {
    authorize , authenticate
}
