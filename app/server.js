"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const mongoose = require('mongoose'); // Importar mongoose
const router = require('././javascript/router');

app.use(cors());
app.use(router);
app.use(express.json());


app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'javascript')));

mongoose.connect('mongodb+srv://bato1993:bato1993@cluster0.0linyln.mongodb.net/', { // Conectar a MongoDB
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:')); // Manejo de errores
db.once('open', () => {
    console.log('Conectado a MongoDB'); // Conexión exitosa
});

app.get('/javascript/utils.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'utils.js'));
});

app.get('/javascript/ajax-handler.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, 'javascript', 'ajax-handler.js'));
});

app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname,'view','home.html'));
});
app.get('/home',(req,res)=>
{
    res.sendFile(path.join(__dirname,'view','home.html'));
});

app.get('/profile',(req,res)=>
{
    res.sendFile(path.join(__dirname,'view','personal_data.html'));
});

app.get('/create-post',(req,res)=>
{
    res.sendFile(path.join(__dirname,'view','createblog.html'));
});



app.listen(port, () => 
    {
    console.log(`Server corriendo en el puerto ${port}`);
    }); 
