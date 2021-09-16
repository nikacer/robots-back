const seguridad = require('../services/seguridad')

const listar = (req, res) => {
    return res.status(200).send('listado')
}

const nuevoToken = (req, res) => {
    return res.status(200).send({ token: seguridad.crearToken() })
}

const verificarToken = (req, res) => {
    return res.status(200).send('ok')
}

module.exports = {
    listar,
    nuevoToken,
    verificarToken
}