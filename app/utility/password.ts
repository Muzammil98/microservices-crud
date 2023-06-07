import { IUserModel } from "app/models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ----------------------------------------

const SALT_ROUNDS = 12;
const JWT_SECRET = "SERVERLESS_SECRETS";


/**
 * Get a hash from the password.
 */
function getHash(pwd: string): Promise<string> {
    return bcrypt.hash(pwd, SALT_ROUNDS);
}

/**
 * Useful for testing.
 */
function hashSync(pwd: string): string {
    return bcrypt.hashSync(pwd, SALT_ROUNDS);
}

/**
 * See if a password passes the hash.
 */
function compare(pwd: string, hash: string): Promise<boolean> {
    return bcrypt.compare(pwd, hash);
}

async function getToken({ email, user_type, _id }: IUserModel): Promise<string> {
    return jwt.sign({
        email, user_type, _id
    }, JWT_SECRET, { expiresIn: "30d" })
}
async function verifyToken(token: string) {
    if (!token) return false

    try {
        const payload = await jwt.verify(token.split(" ")[1], JWT_SECRET)
        return payload as IUserModel

    } catch (error) {
        console.log(error)
        return false
    }

}


export default {
    getHash,
    verifyToken,
    hashSync,
    getToken,
    compare,
} as const;
