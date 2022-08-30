import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scripyAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string){
        const salt = randomBytes(8).toString('hex');
        const buf = (await scripyAsync(password, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`
    }
    static async compare(storedPassword: string, suppliedPassword: string){
        const [hashedPassword, salt] = storedPassword.split(".");
        console.log(hashedPassword);
        console.log(salt);
        const buf = (await scripyAsync(suppliedPassword, salt, 64)) as Buffer;
        console.log(buf.toString('hex'));
        return hashedPassword === buf.toString('hex');
    }
}
