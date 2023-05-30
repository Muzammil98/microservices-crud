// import { userSchema } from 'app/models/User';
// import { Sequelize } from 'sequelize'
import sequelize from '../sequilize'
import { errorResponse } from './response';

export async function connectDB() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error: any) {
        console.log('Unable to connect to the database:');
        console.log(error);

        return errorResponse(500, "Unable to connect to db")
    }
}

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