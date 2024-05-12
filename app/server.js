"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); // Importar mongoose


const app = express();
const port = 3000;
app.use(express.json());
const router = require('././javascript/router');

// Conexión a MongoDB con autenticación, utilizando las credenciales desde la configuración
const config = require('./../config');
const username = config.mongodb.username;
const password = config.mongodb.password;

// Conectar a MongoDB con credenciales
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.0linyln.mongodb.net/Projecto`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:')); // Manejo de errores
db.once('open', () => {
    console.log('Conectado a MongoDB'); // Conexión exitosa
});

const UsersModel = require("./schemas").UsersModel;

// const newUser = new UsersModel({
//     name: 'Nombre de usuario',
//     mail: 'correo@ejemplo.com',
//     password: 'contraseña',
//     imageUrl: imageBuffer, // Asigna el buffer de la imagen
//     followers: [],
//     follows: [],
//     birthDate: new Date(),
//     contact1: 'contacto1',
//     contact2: 'contacto2'
// });
// newUser.save();

// Encuentra el usuario por el nombre




app.use(cors());
app.use(router);

app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'javascript')));

app.get('/javascript/sidebar.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'sidebar.js'));
});

app.get('/view/style.css', (req, res) => {
    res.set('Content-Type', 'text/css');
    res.sendFile(path.join(__dirname, 'view', 'style.css'));
});

app.get('/javascript/insideblog.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'insideblog.js'));
});

app.get('/javascript/post.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'post.js'));

    
});
app.get('/javascript/pagination.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'pagination.js'));
});

app.get('/javascript/searchbar.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'searchbar.js'));
});

app.get('/javascript/ajax-handler.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'ajax-handler.js'));
});

app.get('/javascript/user.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'user.js'));
});
app.get('/javascript/post.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'post.js'));
});

app.get('/javascript/profile.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'profile.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

app.get('/profile', async(req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'personal_data.html'));
});


app.get('/create-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'createblog.html'));
});

app.get('/inside-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'inside_blog.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});


