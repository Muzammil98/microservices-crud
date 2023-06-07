// import { DataTypes, Sequelize } from "sequelize";

// export default async function (sequelize: Sequelize, DataTypes: any) {
//     const User = sequelize.define('User', {
//         name: DataTypes.STRING,
//         email: DataTypes.STRING
//     }, {});
//     User.associate = function (models) {
//         // associations can be defined here
//         User.hasMany(models.Post, {
//             foreignKey: 'userId',
//             as: 'posts',
//             onDelete: 'CASCADE',
//         });

//         User.hasMany(models.Comment, {
//             foreignKey: 'userId',
//             as: 'comments',
//             onDelete: 'CASCADE',
//         });
//     };
//     return User;
// };

export interface IUserModel {
    _id?: string,
    email: string,
    phone: string,
    user_type: "ADMIN" | "USER",
    hash: string
}