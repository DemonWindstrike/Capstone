const express = require('express');
const bodyParser = require('body-parser');
const db = require('../js/db'); // Asegúrate de tener la ruta correcta

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Registro de usuario
app.post('/registro', (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  const sql = 'INSERT INTO users (nombre, correo, contrasena) VALUES (?, ?, ?)';
  db.query(sql, [nombre, correo, contrasena], (err, result) => {
    if (err) {
      console.error('Error al registrar usuario:', err);
      res.status(500).json({ error: 'Error al registrar usuario' });
    } else {
      res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
    }
  });
});

// Inicio de sesión
app.post('/iniciar-sesion', (req, res) => {
  const { correo, contrasena } = req.body;

  const sql = 'SELECT * FROM users WHERE correo = ? AND contrasena = ?';
  db.query(sql, [correo, contrasena], (err, result) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    } else {
      if (result.length > 0) {
        res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
      } else {
        res.status(401).json({ error: 'Credenciales incorrectas' });
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});