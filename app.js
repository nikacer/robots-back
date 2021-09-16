const express = require('express');
const app = express();
const pokemonesRoutes = require('./routes')

app.use('/pokemon', pokemonesRoutes)

module.exports = app;