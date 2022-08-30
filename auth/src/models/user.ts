import mongoose from "mongoose";
import { Password } from '../services/password';
// An interface that describes the properties required
// to create a new User
interface userAttr {
    email: string;
    password: string;
}

// An interface that describes the properties of User Model
interface UserModel extends mongoose.Model<UserDoc> {
    build(attr: userAttr): UserDoc;
}

// An interface that describes what property a single user has
interface UserDoc extends mongoose.Document{
    email: string;
    password: string;
}
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attr: userAttr) => {
    return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
