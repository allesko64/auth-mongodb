import bcrypt from "bcryptjs";

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true , "Name is Required"] ,
        minLength : 5 ,
        maxLength : 45 
    },
    email : {
        type : String,
        required : [true , "Email is Required"],
        trim : true,
        minLength : 6,
        maxLength : 322,
        unique : true
    },
    password : {
        type : String,
        trim : true,
        required : [true , "Password is Required"],
        select : false
    },
    role : {
        type : String , 
        enum : ["customer" , "admin" , "seller"],
        default : "customer"
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationToken : {type: String , select : false},
    refreshToken : {type : String , select : false},
    resetPasswordToken : {type : String , select :false},
    resetPasswordExpiresIn : {type : Date , select : false}
},
{timestamps : true}
)


userSchema.pre('save', async function () {
    if(!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password , 12)
})


userSchema.methods.comparePassword = async function (textPassword) {
    return bcrypt.compare(textPassword , this.password)
}


export default mongoose.model("User" , userSchema)
