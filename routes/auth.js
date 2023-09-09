const express = require('express');
const router = express.Router();


router.post('/views/login.html', (req, res) => {
  // Lógica para el inicio de sesión
});

router.post('/register', (req, res) => {
  // Lógica para el registro de usuarios
});

module.exports = router;
