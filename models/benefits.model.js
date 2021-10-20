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
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: sql.sequelize,
    modelName: 'benefits',
    comment: "Tabla de beneficios"
})

module.exports = Users