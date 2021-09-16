const mysql = require('mysql');

module.exports = class mysqlClass{

    config = mysql.createConnection({
        host: "localhost",
        user:"root",
        password:"",
        database:"test"
    })

    constructor(){}

    consultar(consulta){
        try{
            this.config.connect()
            this.config.query(consulta, (err,row, fields)=>{
                console.log(row)
            })
        }catch(err){
            console.log(err)
        } finally{
            this.config.end();
        }
    }
}