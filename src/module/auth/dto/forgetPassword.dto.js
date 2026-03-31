import Joi from "joi";
import baseDto from "../../../common/dto/baseDto.js";



class ForgotPasswordDto extends baseDto {
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
    });
}

export default ForgotPasswordDto;