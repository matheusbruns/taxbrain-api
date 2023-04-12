const express = require('express');
const routes = express.Router();

const userController = require('./controllers/userControler');

// Rota usuários
routes.get('/users', userController.read);


module.exports = routes;
