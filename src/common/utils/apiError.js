class apiError extends Error{

    constructor(statusCode , message){
        
        super(message)
        this.statusCode = statusCode
        Error.captureStackTrace(this , this.constructor)
    }

    static badRequest(message = "Bad request") {
        return new apiError(400, message);
    }

    static unauthorized(message = "Unauthorized") {
        return new apiError(401, message);
    }
    static conflict(message = "Conflict") {
        return new apiError(409, message);
    }
    static forbidden(message = "forbidden") {
        return new apiError(403, message);
    }
    static notfound(message = "notfound") {
        return new apiError(409, message);
    }
}

export default apiError