import { CustomError } from "./custom-errors";
export class DatabaseConnectErrors extends CustomError {
    statusCode = 500;
    reason = "Error connecting to the database";

    constructor(){
        super("Error connecting to the database");
        Object.setPrototypeOf(this, DatabaseConnectErrors.prototype);
    }

    serializeErrors(){
        return [{ message: this.reason }];
    }
}
