import { Client } from 'pg'

export const DBClient = () => {
    const connectionString = `postgres://userservice_user:9o880jEmycagXZOPC1mlk9niq99B1HW8@dpg-chhlrjbhp8ufj5v5c6a0-a.singapore-postgres.render.com/userservice`;

    return new Client({
        connectionString,
        ssl: { rejectUnauthorized: false },
        // ssl: true,
        // keepAlive:true,
        // // idleTimeoutMillis: 0,
        // connectionTimeoutMillis: 0,
    })
}