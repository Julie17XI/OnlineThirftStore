import express from "express";
require('express-async-errors');
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signupRouter } from "./routes/signup";
import { signoutRouter } from "./routes/signout";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-errors";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.get('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY){
        throw new Error("Secret not defined")
    }
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    } catch (err) {
        console.error(err);
    }
    console.log("Connected to MongoDB")
    app.listen(3000, () => {
        console.log("Listening to port 3000!");
    });
};

start();
