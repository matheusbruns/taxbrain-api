const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControler');

// Rota usuários
router.route("/users").post(userController.create);
router.route("/login").post(userController.login);

module.exports = router;

