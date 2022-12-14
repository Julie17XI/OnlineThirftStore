import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationErrors } from '../errors/request-validation-errors';
import { BadRequestError } from '../errors/bad-request-errors';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-requests';
const router = express.Router();

router.post(
    '/api/users/signup',
    [
        body("email")
            .isEmail()
            .withMessage("Email must be valid."),
        body("password")
            .trim()
            .isLength({min:8, max: 16})
            .withMessage("Password must be between 8 to 16 characters.")
    ],validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("User exists");
        }
        const user = User.build({ email, password });
        await user.save();
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);
        req.session = {
            jwt: userJwt
        };
        res.status(201).send(user);
});

export {router as signupRouter};
