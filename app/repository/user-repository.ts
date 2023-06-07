import { connectDB } from "../utility/db";
import { IUserModel } from "../models/UserModel";
import { DBClient } from "../utility/dbClient";

export class UserRepository {
    constructor() { }

    async createAccount({ email, phone, user_type, hash }: IUserModel) {
        const db = await DBClient()
        await db.connect()

        // const createResult = await db.query(`CREATE TABLE "users" (
        //     "_id" bigserial PRIMARY KEY,
        //     "phone" varchar NOT NULL,
        //     "email" varchar NOT NULL,
        //     "hash" varchar NOT NULL,
        //     "user_type" varchar NOT NULL,
        //     "created_at" timestamptz NOT NULL DEFAULT (now())
        // )`);
        // console.log("createResult",createResult)

        const query = `INSERT INTO users(email, phone, user_type, hash) VALUES($1,$2,$3,$4) RETURNING *`
        const values = [email, phone, user_type, hash]

        const result = await db.query(query, values)

        // console.log("CREATE", result)

        await db.end()

        if (result.rowCount > 0) {
            return result.rows[0] as IUserModel
        }
    }
    async findAccount(email: string) {
        const db = await DBClient()
        await db.connect()

        const query = `SELECT _id, email, hash, user_type, phone FROM users WHERE email = $1`
        const values = [email,]

        const result = await db.query(query, values)

        await db.end()

        if (result.rowCount < 1)
            throw new Error("User does not exist with that email id")

        return result.rows[0] as IUserModel
    }
}