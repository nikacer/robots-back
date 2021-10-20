const { Model, DataTypes } = require('sequelize');
const MariaDB = require('../services/maridb')
const sql = new MariaDB()

class Users extends Model { }

Users.init({
    id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: sql.sequelize,
    modelName: 'users',
    comment: "Tabla de usuarios"
})

module.exports = Users