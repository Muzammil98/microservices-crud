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
            
        const query = `INSERT INTO users(email, phone, user_type, hash) VALUES($1,$2,$3,$4)`
        const values = [email, phone, user_type, hash]

        const result = await db.query(query, values)

        // console.log("CREATE", result)

        await db.end()

        return result
    }
}