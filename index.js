if (typeof process.env.NODE_ENV === 'undefined') {
    require('dotenv').config()
}

const app = require('./app')
const mongoose = require('mongoose');
const sqlClass = require('./services/maridb')
const cron = require('./jobs')


const sql = new sqlClass()

const port = process.env.PORT

mongoose.connect(process.env.BD, async (err, res) => {
    if (err) throw err;
    console.log('coneccion a la base de datos establecida');
    await sql._autenticar()
    //cron.init()
    app.listen(port, () => {
        console.log(' Servidor cargado en el puerto ' + port)
    })
});



