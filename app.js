const express = require("express");
const path = require("path");
const cors = require('cors');
const authRoutes = require('./routes/auth');
const app = express();
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const CryptoJS = require("crypto-js");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

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

app.get("/indexadmin", (req, res) => {
    res.render('indexadmin')
});

app.get("/registroespe", (req, res) => {
    res.render('registroespe')
});

app.get("/nosotros", (req, res) => {
    res.render('nosotros')
});

app.get("/register", (req, res) => {
    res.render('register')
});

app.get("/mainarea", (req, res) => {
    res.render('mainarea')
});

app.get("/horas", (req, res) => {
    res.render('horas')
});

app.get("/pagohora", (req, res) => {
    res.render('pagohora')
});

app.get("/portalpatient", (req, res) => {
    res.render('portalpatient')
});

app.get('/perfil/:id', (req, res) => {
    const id = req.params.id;
    // Aquí podrías realizar alguna lógica adicional si es necesario
    // Por ahora, simplemente devolvemos el ID como confirmación
    res.render('perfil');
});

//Chatbox

app.get('/respuesta1', (req, res) => {
    res.send('Respuesta para la opción 1');
  });
  
  app.get('/respuesta2', (req, res) => {
    res.send('Respuesta para la opción 2');
  });
  
  app.get('/respuesta3', (req, res) => {
    res.send('Respuesta para la opción 3');
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
app.get("/reservahora", checkUserCookie , (req, res) => {
    res.render('reservahora');
});

app.post("/reservahora/:id", (req, res) => {
    const id = req.params.id;
    const valorInput = req.body.rutPaciente;
    console.log(valorInput); 
    res.render('reservahora');
});
// Ahora usa la función middleware en tu ruta
app.get("/especialistas", checkUserCookie, (req, res) => {
    res.render('especialistas');
});

app.get("/mantEspecialista", checkUserCookie, (req, res) => {
    res.render('mantenedorEspecialista');
});

//Registro

app.post('/register', async (req, res) => {
    const { user, email, pass, rol, rut, edad } = req.body;
    console.log(user, email, pass);

    try {
        // Verificar si el usuario o correo electrónico ya están registrados
        connection.query('SELECT * FROM users WHERE email = ? OR user = ?', [email, user], async (error, results) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ success: false, error: 'Error al verificar el usuario.' });
            }

            if (results.length > 0) {
                // Usuario o correo electrónico ya registrados
                return res.status(409).json({ success: false, error: 'El usuario o correo electrónico ya están en uso.' });
            } else {
                // Si no hay duplicados, procedemos a crear el nuevo usuario
                let passwordHash = await bcryptjs.hash(pass, 8);
                connection.query('INSERT INTO users SET ?', { user: user, email: email, rol: rol, pass: passwordHash, rut: rut, edad: edad }, (error, results) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).json({ success: false, error: 'Error al registrar el usuario.' });
                    } else {
                        return res.status(201).json({ success: true, message: 'Usuario registrado con éxito.' });
                    }
                });
            }
        });
    } catch (error) {
        console.error('Error al procesar el registro:', error);
        res.status(500).json({ success: false, error: 'Error al procesar la solicitud.' });
    }
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

//Registro Especialista

app.listen(3003, () => {
    console.log("Server corriendo en le puerto", href='http://localhost:3003/' );
});

app.use(express.static('public'));


