const express = require("express");
const path = require("path");
const authRoutes = require('./routes/auth');
const app = express();

// Urluncoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/auth', authRoutes);

//Invocar doteenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//Directorio Public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname +'/public'));

//Motor de plantillas
app.set('view engine', 'ejs');

//Invocar bcryptjs
const bcryptjs = require('bcryptjs');

//Var. session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));

//Invocar modulo de conexion de la BD
const connection = require('./database/db')

// Rutas
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/login", (req, res) => {
    res.render('login')
});

app.get("/register", (req, res) => {
    res.render('register')
});

//Registro

app.post('/register', async (req, res) => {
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    console.log(user, name, rol, pass);
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', { user: user, name: name, rol: rol, pass: passwordHash }, async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index');
        }
    });
});


app.listen(3000, () => {
    console.log("Server corriendo en le puerto", href='http://localhost:3000/' );
});

app.use(express.static('public'));


