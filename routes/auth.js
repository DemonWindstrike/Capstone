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

router.post('/nosotros', (req, res) => {
  // Lógica para ver nosotros
});


router.post('/reservahora', (req, res) => {
  // Lógica para reservar hora
});

router.post('/mainarea', (req, res) => {
  // Lógica para reservar hora
});

router.post('/horas', (req, res) => {
  // Lógica para reservar hora
});


router.post('/portalpatient', (req, res) => {
  // Lógica para reservar hora
});

module.exports = router;
