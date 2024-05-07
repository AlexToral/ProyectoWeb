"use strict";   

const express = require('express');
const router = express.Router();
const postRouter = require('../routes/post_routes');
const adminPostRouter = require('./../routes/admin_post');
const bcrypt = require('bcrypt');
const saltRounds = 15; // Número de rondas de hashing


//router.use(userLogIn);

const usersModel = require('./../schemas').UsersModel;
router.use('/posts',postRouter);
router.use('/admin/posts',userLogIn, adminPostRouter);

function userLogIn(req,res,next)
{
    
    let adminToken = req.get('x-auth');
    if(adminToken === undefined || adminToken!="admin")
    {
        res.status(403).send("Acceso no autorizado, no se cuenta con privilegios de administrador");
    }
    else
    {
        next();
    }
}  


router.post('/login', async (req, res) => {
    const { mail, password } = req.body;

    try {
        // Buscar el usuario en la base de datos por email
        const userRecord = await usersModel.findOne({ mail });

        if (!userRecord) {
            return res.status(404).json({ message: 'Contraseña o Usuario Incorrecto' });
        }

        // Comparar la contraseña proporcionada con el hash almacenado en la base de datos
        const passwordMatch = await bcrypt.compare(password, userRecord.password);

        if(!passwordMatch){
            return res.status(404).json({ message: 'Contraseña o Usuario Incorrecto' });
        }

        res.status(200).json({ message: 'Bienvenido', userName: userRecord.name });

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








module.exports = router;
