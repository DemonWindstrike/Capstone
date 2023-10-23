const express = require("express");
const path = require("path");
const authRoutes = require('./routes/auth');
const app = express();

// Urluncoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/auth', authRoutes);

//Express validator



//Invocar doteenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//Directorio Public
app.use('/resources', express.static(__dirname +'/public'));

//Motor de plantillas
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

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
    const email = req.body.email;
    const pass = req.body.pass;
    console.log(user, email, pass);
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', { user: user, email: email, pass: passwordHash }, async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index');
        }
    });
});

//Login

app.post('/login', async (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (results.length > 0) {
                const user = results[0];
                const match = await bcryptjs.compare(pass, user.pass);

                if (match) {
                    req.session.user = user; // Guardar información del usuario en la sesión
                    res.json({ success: true, user: user });
                } else {
                    res.status(401).json({ error: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }
    });
});

app.listen(3000, () => {
    console.log("Server corriendo en le puerto", href='http://localhost:3000/' );
});

app.use(express.static('public'));


