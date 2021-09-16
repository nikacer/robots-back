const app = require('./app')

if (typeof process.env.NODE_ENV === 'undefined') {
    require('dotenv').config()
}

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Servidor cargado en el puerto ${port}`)
})
