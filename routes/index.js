const express = require('express')
const api = express.Router();
const auth = require('../middelware/auth')
const { benefits, obtenerUsuarios } = require('../controllers/robots')


api.get('/benefits', auth, benefits)
api.post('/users', obtenerUsuarios)


module.exports = api