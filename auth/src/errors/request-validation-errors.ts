import { CustomError } from "./custom-errors";
import { ValidationError } from "express-validator";

export class RequestValidationErrors extends CustomError{
    statusCode = 400;
    constructor(public errors: ValidationError[]){
        super("Invalid request parameters");
        Object.setPrototypeOf(this, RequestValidationErrors.prototype);
    }

    serializeErrors(){
        return this.errors.map(err => {
            return { message: err.msg, field: err.param};
        });
    }
}
