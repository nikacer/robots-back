if (typeof process.env.NODE_ENV === 'undefined') {
    require('dotenv').config()
}

const app = require('./app')
const sqlClass = require('./services/maridb')


const sql = new sqlClass()

const port = process.env.PORT

const init = async () => {
    try {
        await sql._autenticar()
        app.listen(port, () => {
            console.log(' Servidor cargado en el puerto ' + port)
        })
    } catch (err) {
        throw err
    }
}

init()



