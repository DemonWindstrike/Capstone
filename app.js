const express = require("express");
const path = require("path");
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
// Urluncoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


app.use('/auth', authRoutes);

//Express validator




// ... configuraciones previas de tu app ...

app.use(cookieParser()); // Esto permite que tu aplicación use el middleware de cookie-parser

// ... más configuraciones de tu app ...

//Invocar doteenv

dotenv.config({path:'./env/.env'});

//Directorio Public
app.use('/resources', express.static(__dirname +'/public'));

//Motor de plantillas
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

//Invocar bcryptjs


//Var. session

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

app.get('/perfil/:id', (req, res) => {
    const id = req.params.id;
    // Aquí podrías realizar alguna lógica adicional si es necesario
    // Por ahora, simplemente devolvemos el ID como confirmación
    res.render('perfil');
});

app.get("/reservahora", (req, res) => {
    res.render('reservahora')
});
//validacion si el usuario tiene la sesion iniciada
const checkUserCookie = (req, res, next) => {
    // Obtén las cookies del usuario
    const usuario = req.cookies['usuario'];
    const rol = req.cookies['rol'];

    // Verifica si las cookies de usuario y rol existen
    if (usuario && rol) {
        // Continúa con la ruta si las cookies son válidas
        next();
    } else {
        // Redirecciona si no están presentes o no son válidas
        res.redirect('/register');
    }
};

// Ahora usa la función middleware en tu ruta
app.get("/especialistas", checkUserCookie, (req, res) => {
    res.render('especialistas');
});

//Registro

app.post('/register', async (req, res) => {
    const user = req.body.user;
    const email = req.body.email;
    const pass = req.body.pass;
    const rol = req.body.rol;
    console.log(user, email, pass, rol);
    let passwordHash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', { user: user, email: email, pass: passwordHash, rol: rol }, async (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.render('index');
        }
    });
});

//Login

app.post('/login', async (req, res) => {
    const { email, pass } = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            if (results.length > 0) {
                const user = results[0];
                const match = await bcryptjs.compare(pass, user.pass);

                if (match) {
                    req.session.user = { ...user }; // Guardar información del usuario en la sesión sin la contraseña
                    delete req.session.user.pass; // No es buena práctica enviar la contraseña, incluso si está cifrada
                    res.json({ success: true, user: req.session.user });
                } else {
                    res.status(401).json({ error: 'Contraseña incorrecta' });
                }
            } else {
                res.status(404).json({ error: 'Usuario no encontrado' });
            }
        }
    });
});


app.listen(3003, () => {
    console.log("Server corriendo en le puerto", href='http://localhost:3003/' );
});

app.use(express.static('public'));


