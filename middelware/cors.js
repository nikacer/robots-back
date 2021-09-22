module.exports = corsOptions = (req, callback) => {
    let corsOptions = { origin: false }
    let error = 'no tiene permisos para acceder'
    if (process.env.LISTA_BLANCA.split(',').indexOf(req.header('host')) !== -1) {
        corsOptions = { origin: true }
        error = null
    }
    callback(error, corsOptions)
}