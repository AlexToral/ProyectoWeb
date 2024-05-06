"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose'); // Importar mongoose

const app = express();
const port = 3000;
const router = require('././javascript/router');

// Conexión a MongoDB con autenticación, utilizando las credenciales desde la configuración
const config = require('./../config');
const username = config.mongodb.username;
const password = config.mongodb.password;

// Conectar a MongoDB con credenciales
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.0linyln.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:')); // Manejo de errores
db.once('open', () => {
    console.log('Conectado a MongoDB'); // Conexión exitosa
});

app.use(cors());
app.use(router);
app.use(express.json());

app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'javascript')));

app.get('/javascript/utils.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'utils.js'));
});


app.get('/javascript/ajax-handler.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'ajax-handler.js'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'personal_data.html'));
});


app.get('/create-post', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'createblog.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
