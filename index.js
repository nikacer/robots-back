if (typeof process.env.NODE_ENV === 'undefined') {
    require('dotenv').config()
}

const app = require('./app')
const mongoose = require('mongoose')
const MysqlClass = require('./services/db')

const sql = new MysqlClass();


const port = process.env.PORT


mongoose.connect(process.env.DB, async (err, res) => {
    if (err) throw err;
    console.log('base de datos ok')
    await sql.autenticar()
    app.listen(port, () => {
        console.log(`Servidor cargado en el puerto ${port}`)
    })
})
