"use strict";   

const express = require('express');
const router = express.Router();
const postRouter = require('../routes/post_routes');
const adminPostRouter = require('./../routes/admin_post');
const bcrypt = require('bcrypt');
const saltRounds = 15; // Número de rondas de hashing
const jwt = require('jsonwebtoken');

//router.use(userLogIn);

const usersModel = require('./../schemas').UsersModel;
const postModel = require('./../schemas').BlogModel;
router.use('/posts',postRouter);
router.use('/admin/posts',userLogIn, adminPostRouter);

function userLogIn(req,res,next)
{
    const token = req.headers.authorization;
    if(!token)
    {
        return res.status(401).json({message: "No has iniciado sesion"});
    }
    jwt.verify(token, 'candado', (error, decoded) => {
        if(error)
        {
            return res.status(401).json({message: "No autorizado"});
        }
        req.userId = decoded.userId;
        next();
    });

}


router.post('/login', async (req, res) => {
    const { mail, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por email
        const userRecord = await usersModel.findOne({ mail });
        console.log(userRecord);

        if (!userRecord) {
            return res.status(404).json({ message: 'Contraseña o Usuario Incorrecto' });
        }

        // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
        const passwordMatch = await bcrypt.compare(password, userRecord.password);

        if(!passwordMatch){
            return res.status(404).json({ message: 'Contraseña o Usuario Incorrecto' });
        }
        const token = generateToken(userRecord);
        res.status(200).json({ message: 'Bienvenido', userName: userRecord.name , token: token});

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


router.post('/users', async (req, res) => {
    try {
        const { name, mail, password, imageUrl, followers, follows, birthDate, contact1, contact2 } = req.body;
        const checkName = await usersModel.findOne({ name: name });
        const checkMail = await usersModel.findOne({mail:mail});
        
        if (checkName) {
            return res.status(400).send("Error, el nombre de usuario ya existe");
        }
        else if (checkMail){
            return res.status(400).send("Error, la direccion de correo ya esta registrada");
        }

        // Generar el hash de la contraseña
        const hash = await bcrypt.hash(password, saltRounds);

        // Crear un nuevo usuario con el hash de la contraseña
        const user = new usersModel({ name, mail, password: hash, imageUrl, followers, follows, birthDate, contact1, contact2 });

        // Guardar el usuario en la base de datos
        await user.save();

        res.status(200).json({ message: "Usuario creado", userId: user.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error");
    }
});


router.post('/post-create', async (req, res) => {
    try
    {
        console.log("author:" ,req.body.author);
        jwt.verify(req.body.author, 'candado', (error, decoded) => {
            if(error)
            {
                return res.status(401).json({message: "No autorizado"});
            }
            req.userId = decoded.userId;
        });
        const { title, description, content, imageUrl, author, likes, comments, category } = req.body;
        const newPost = new postModel({ title, description, content, imageUrl, author, likes, comments, category });
        await newPost.save();
        res.status(200).json({ message: "Post creado", postId: newPost.id });
    }
    catch(error)
    {
        console.error(error);
    }
});


function generateToken(user) {
    const payload = 
    {
        userId: user._id,
    };
    const token = jwt.sign(payload, 'candado', { expiresIn: '1h' }); // Firma el token con una clave secreta y establece un tiempo de expiración
    return token;
}







module.exports = router;
