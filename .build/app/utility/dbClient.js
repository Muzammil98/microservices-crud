"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBClient = void 0;
const pg_1 = require("pg");
const DBClient = () => {
    const connectionString = `postgres://userservice_user:9o880jEmycagXZOPC1mlk9niq99B1HW8@dpg-chhlrjbhp8ufj5v5c6a0-a.singapore-postgres.render.com/userservice`;
    return new pg_1.Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        // ssl: true,
        // keepAlive:true,
        // // idleTimeoutMillis: 0,
        // connectionTimeoutMillis: 0,
    });
};
exports.DBClient = DBClient;
//# sourceMappingURL=dbClient.js.map