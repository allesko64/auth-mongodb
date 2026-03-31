import { Router } from "express";
import validate from "../../common/middleware/validate.middleware.js"
import registerDto from "../../module/auth/dto/register.dto.js"
import loginDto from "./dto/login.dto.js";
import forgetPassword from "../auth/dto/forgetPassword.dto.js"
import resetPassword from "./dto/resetPassword.dto.js"
import * as controller from "./auth.controller.js"
import { authenticate , authorize } from "./auth.middleware.js";



const route = Router();

route.post("/register" , validate(registerDto), controller.register)
route.post("/login" , validate(loginDto) , controller.login)
route.post("/logout" , authenticate , controller.logout )
route.post("/refersh" , controller.refresh )
route.get("/verify-email/:token" , controller.verifyEmail)
route.post("/forgetPassword" , validate(forgetPassword) , controller.forgetPassword)

route.put("/reset-password/:token" , validate(resetPassword),controller.resetPassword)

route.get("/aboutMe" , authenticate , controller.aboutMe)


export default route;
