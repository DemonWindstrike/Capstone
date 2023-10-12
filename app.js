const express = require("express");
const path = require("path");
const authRoutes = require('./routes/auth');

const app = express();

app.use('/auth', authRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/public/views/index.html"));
});

app.listen(3002, () => {
    console.log("Server corriendo en le puerto", href='http://localhost:3002/' );
});

app.use(express.static('public'));

