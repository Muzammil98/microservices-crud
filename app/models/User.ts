import { Sequelize, DataTypes, } from 'sequelize'
import { getSequelizeInstance, checkDBConnection } from '../utility/db'




(async () => {
    const sequelize = getSequelizeInstance()
    await checkDBConnection(sequelize)

    const userSchema = {
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING
        }
    }

    const modelOptions = {
        // Other model options go here
    }

    const User = sequelize.define('User', userSchema, modelOptions);

    sequelize.sync().then(() => {
        console.log('User table created successfully!');
    }).catch((error) => {
        console.error('Unable to create table : ', error);
    });

})()

// export const User = sequelize.define('User', userSchema, modelOptions);

