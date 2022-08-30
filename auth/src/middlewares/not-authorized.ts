import { Request, Response, NextFunction } from "express";
import { NotAuthorizedErrors } from "../errors/not-authorized-errors";

export const notAuthorized = (
 req: Request,
 res: Response,
 next: NextFunction
) => {
    if (!req.currentUser){
        throw new NotAuthorizedErrors();
    }
    next();
};
