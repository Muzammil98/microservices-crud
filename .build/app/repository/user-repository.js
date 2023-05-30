"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const dbClient_1 = require("../utility/dbClient");
class UserRepository {
    constructor() { }
    createAccount({ email, phone, user_type, hash }) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield (0, dbClient_1.DBClient)();
            yield db.connect();
            // const createResult = await db.query(`CREATE TABLE "users" (
            //     "_id" bigserial PRIMARY KEY,
            //     "phone" varchar NOT NULL,
            //     "email" varchar NOT NULL,
            //     "hash" varchar NOT NULL,
            //     "user_type" varchar NOT NULL,
            //     "created_at" timestamptz NOT NULL DEFAULT (now())
            // )`);
            // console.log("createResult",createResult)
            const query = `INSERT INTO users(email, phone, user_type, hash) VALUES($1,$2,$3,$4)`;
            const values = [email, phone, user_type, hash];
            const result = yield db.query(query, values);
            console.log("CREATE", result);
            yield db.end();
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map