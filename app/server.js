"use strict";

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;
const router = require('././controllers/router');

app.use(cors());
app.use(router);
app.use(express.json());


app.use(express.static(path.join(__dirname, 'views')));


app.get(['/','/home'],(req,res)=>
{
    res.sendFile(path.join(__dirname,'views','home.html'));
});

app.get('/profile',(req,res)=>
{
    res.sendFile(path.join(__dirname,'views','personal_data.html'));
});
app.listen(port, () => {
    console.log(`Server corriendo en el puerto ${port}`);
}); 