import express from "express"
import authRoute from "./module/auth/auth.route.js"
import apiError from "./common/utils/apiError.js";
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use("/api/auth" , authRoute)

app.use((err , req , res , next) => {
    console.log(err)
    if(err instanceof apiError){
        return res.status(err.statusCode).json({
            success : false,
            message : err.message
        })
    }
    return res.status(500).json({success : false, message : "Internal Server Error"})
})



export default app
