const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControler');
const clientController = require('../controllers/ClientControler');

// Rota usuários
router.route("/users").post(userController.create);
router.route("/login").post(userController.login);

// Rota clientes
router.route("/client-new").post(clientController.create);
router.route("/clients").get(clientController.read);

module.exports = router;

