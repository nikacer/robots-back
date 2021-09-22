const mariadb = require('mariadb');
const  mysql= require('mysql2');
const { Sequelize} = require('sequelize');

// conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);


class MariaDB {

    constructor(){
      if(typeof MariaDB.intance === 'object'){
        return MariaDB.intance;
      }

      this._crearSequelize()
      MariaDB.intance = this
      return this
      
    }

    _crearSequelize(){
      const [servidor, usuario, password, baseDatos] = process.env.MYSQL.split(',')
      
      this.sequelize = new Sequelize(
        baseDatos,usuario, password, {
          host: servidor,
          dialect: 'mysql'
        })
    }

    async _autenticar(){
      try{
        const response = await this.sequelize.authenticate()
        console.log("base de datos relaicional conectada")
      }catch(err){
        console.error("error conexion bd relacional",err)
        throw err;
      }
    }

    }

    module.exports = MariaDB