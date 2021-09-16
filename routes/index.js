const express = require('express')
const api = express.Router();
const auth = require('../middelware/auth')

const pokemonesController = require('../controllers/pokemones.controller');

api.get('/listar', pokemonesController.listar)
api.get('/token', pokemonesController.nuevoToken)
api.post('/prueba-token', auth, pokemonesController.verificarToken)


module.exports = api