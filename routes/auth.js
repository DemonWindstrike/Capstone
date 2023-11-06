const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // Lógica para el inicio de sesión

});

router.post('/register', (req, res) => {
  // Lógica para el registro de usuarios
});

router.post('/especialistas', (req, res) => {
  // Lógica para busqueda de especialista
});

router.post('/perfil', (req, res) => {
  // Lógica para ver perfil
});


module.exports = router;
