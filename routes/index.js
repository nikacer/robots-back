const express = require('express')
const api = express.Router();
const auth = require('../middelware/auth')

const pokemonesController = require('../controllers/pokemones.controller');

api.get('/listar', pokemonesController.listar)
api.get('/token', pokemonesController.nuevoToken)
api.post('/prueba-token', auth, pokemonesController.verificarToken)
api.post('/agregar', pokemonesController.agregarPokemon )
api.post('/todos', pokemonesController.obtenerPokemones )
api.get('/noticias', pokemonesController.obtenerNoticias)
api.get('/sequelize', pokemonesController.sequelize)
api.get('/sequelize-all', pokemonesController.sequelizeAll)
api.get('/pdf', pokemonesController.retornoPDF)


module.exports = api