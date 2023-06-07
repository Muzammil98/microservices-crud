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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// ----------------------------------------
const SALT_ROUNDS = 12;
const JWT_SECRET = "SERVERLESS_SECRETS";
/**
 * Get a hash from the password.
 */
function getHash(pwd) {
    return bcrypt_1.default.hash(pwd, SALT_ROUNDS);
}
/**
 * Useful for testing.
 */
function hashSync(pwd) {
    return bcrypt_1.default.hashSync(pwd, SALT_ROUNDS);
}
/**
 * See if a password passes the hash.
 */
function compare(pwd, hash) {
    return bcrypt_1.default.compare(pwd, hash);
}
function getToken({ email, user_type, _id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({
            email, user_type, _id
        }, JWT_SECRET, { expiresIn: "30d" });
    });
}
function verifyToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!token)
            return false;
        try {
            const payload = yield jsonwebtoken_1.default.verify(token.split(" ")[1], JWT_SECRET);
            return payload;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.default = {
    getHash,
    verifyToken,
    hashSync,
    getToken,
    compare,
};
//# sourceMappingURL=password.js.map