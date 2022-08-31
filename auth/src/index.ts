import mongoose from "mongoose";
import { app } from './app'
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
