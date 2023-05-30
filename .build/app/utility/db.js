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
exports.connectDB = void 0;
// import { userSchema } from 'app/models/User';
// import { Sequelize } from 'sequelize'
const sequilize_1 = __importDefault(require("../sequilize"));
const response_1 = require("./response");
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Checking database connection...`);
        try {
            yield sequilize_1.default.authenticate();
            console.log('Database connection OK!');
        }
        catch (error) {
            console.log('Unable to connect to the database:');
            console.log(error);
            return (0, response_1.errorResponse)(500, "Unable to connect to db");
        }
    });
}
exports.connectDB = connectDB;
// export const getSequelizeInstance = () => {
//     const sequelize = new Sequelize('postgres://userservice_user:9o880jEmycagXZOPC1mlk9niq99B1HW8@dpg-chhlrjbhp8ufj5v5c6a0-a.singapore-postgres.render.com/userservice')
//     return sequelize
// }
// export const checkDBConnection = async (sequelize: Sequelize) => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
// export default async function DB() {
//     const sequelize = getSequelizeInstance()
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }
//# sourceMappingURL=db.js.map