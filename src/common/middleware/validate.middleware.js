import apiError from "../utils/apiError.js"


const  validate = (dtoClass) => {
    return(req , res , next) => {
        const {value , errors} = dtoClass.validate(req.body)

        if(errors){
            throw apiError.badRequest(errors.join(", "))
        }
        req.body = value
        next()
    }

}

export default validate