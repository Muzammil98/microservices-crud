"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./models/user.model"));
// import { applyExtraSetup } = require('./extra-setup');
// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new sequelize_1.Sequelize('postgres://userservice_user:9o880jEmycagXZOPC1mlk9niq99B1HW8@dpg-chhlrjbhp8ufj5v5c6a0-a.singapore-postgres.render.com/userservice');
const modelDefiners = [
    user_model_1.default
    // Add more models here...
    // require('./models/item'),
];
// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}
// We execute any extra setup after the models are defined, such as adding associations.
// applyExtraSetup(sequelize);
// We export the sequelize connection instance to be used around our app.
exports.default = sequelize;
//# sourceMappingURL=index.js.map