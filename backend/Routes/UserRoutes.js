const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// rotas

router.post('/', UserController.criarUsuario);
router.post('/login', UserController.loginUsuario);

module.exports = router;