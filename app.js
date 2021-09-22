const express = require('express');
const cors = require('cors')
const app = express();
const pokemonesRoutes = require('./routes')
const reglas = require('./middelware/cors')

app.use(cors())
app.use(express.json())

app.use('/pokemon', cors(reglas), pokemonesRoutes)

module.exports = app;