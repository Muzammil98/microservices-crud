"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
function default_1(sequelize) {
    sequelize.define('user', {
        // The following specification of the 'id' attribute could be omitted
        // since it is the default.
        _id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER
        },
        email: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            unique: true,
        },
        hash: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        user_type: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
        },
        // username: {
        //     allowNull: false,
        //     type: DataTypes.STRING,
        //     unique: true,
        //     validate: {
        //         // We require usernames to have length of at least 3, and
        //         // only use letters, numbers and underscores.
        //         is: /^\w{3,}$/
        //     }
        // },
    });
}
exports.default = default_1;
;
//# sourceMappingURL=user.model.js.map