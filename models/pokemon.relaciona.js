const {Model, DataTypes} = require('sequelize');
const sqlClass = require('../services/maridb')
const sql = new sqlClass()

class Pokemon extends Model {}

Pokemon.init({
    nombre:{
        type: DataTypes.STRING,
        allowNull:false
    },
    peso:{
        type: DataTypes.NUMBER,
        allowNull:false
    },
    familia:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize: sql.sequelize,
    modelName: 'pokemones'
})

module.exports = Pokemon

