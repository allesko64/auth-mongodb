import Joi from "joi";

class baseDto{
    static schema = Joi.object({});

    static validate(data){
        const {value , error } = this.schema.validate(data , {
            abortEarly : false,
            stripUnknown : true
        })

        if(error){
            const errors = error.details.map(d => d.message);
            return {value : null , errors}
        }
        return {value , errors : null}
    }
}

export default baseDto