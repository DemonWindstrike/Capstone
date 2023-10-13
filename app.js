const express = require("express");
const path = require("path");
const authRoutes = require('./routes/auth');
const app = express();

const mysql = require('mysql');

app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

app.listen(3002, () => {
    console.log("Server corriendo en le puerto", href='http://localhost:3002/' );
});

app.use(express.static('public'));

app.use(express.urlencoded({extended:false}));
app.use(express.json());



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'medihubdb'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});
