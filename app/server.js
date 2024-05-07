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

/*


const BlogModel = require('./schemas').BlogModel;

const CommentModel = require('./schemas').CommentModel;


BlogModel.find({})
  .then(docs => {
    console.log('Documentos en la colección Projecto:', docs);
  })
  .catch(err => {
    console.error('Error al consultar documentos:', err);
  });

  
const Dato = new BlogModel({
    title: "TITULO 1",
    description: "UNA DESCRIPCION MUY LATRHA",
    content: "LOREMLOREMLOREMLOREMLOREMLOREMLOREM",
    imageUrl: "STRING.HTML",
    author: "MARY SUE",
    likes: 1,
    comments: 999,
    category: "SALUD MENTAL",
    id: 2
});

Dato.save()
    .then(()=> {
        console.log("Se guardo El usuario");
    })
    .catch(error => {
        console.error("No se guardo ", error);
    });


*/

app.use(cors());
app.use(router);

app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'javascript')));

app.get('/javascript/sidebar.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'sidebar.js'));
});


app.get('/javascript/ajax-handler.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'ajax-handler.js'));
});

app.get('/javascript/user.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'user.js'));
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


