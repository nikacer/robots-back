const app = require('./app')
const mongoose = require('mongoose')

if (typeof process.env.NODE_ENV === 'undefined') {
    require('dotenv').config()
}

const port = process.env.PORT


mongoose.connect(process.env.DB,(err, res)=>{
if(err) throw err;
console.log('base de datos ok')
app.listen(port, () => {
    console.log(`Servidor cargado en el puerto ${port}`)
})
})
