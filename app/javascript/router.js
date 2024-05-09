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
    console.log(token);
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

router.get('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await usersModel.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.put('/users', async (req, res) => {
    try {
        const {id,name, mail,imageUrl, birthDate, contact1, contact2 } = req.body;
        const newData = {
            name: name,
            mail: mail,
            imageUrl: imageUrl,
            birthDate: birthDate,
            contact1: contact1,
            contact2: contact2
        };

        if(req.file){
            newData.imageUrl = req.file.path;
        }


        // Buscar y actualizar el usuario por su nombre previo
        const usuarioActualizado = await usersModel.findByIdAndUpdate(id, newData);

        if (!usuarioActualizado) {
            console.log("No se encontró el usuario.");
            return res.status(404).send("No se encontró el usuario.");
        }

        console.log("Usuario Actualizado:", usuarioActualizado);
        res.send("Usuario Actualizado");
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).send("Error al actualizar usuario");
    }
});


router.post('/post-create', async (req, res) => {
    try {
        jwt.verify(req.body.author, 'candado', (error, decoded) => {
            if (error) {
                return res.status(401).json({ message: "No autorizado" });
            }
            req.userId = decoded.userId;

            const { title, description, content, imageUrl, author, likes, comments, category } = req.body;
            const newPost = new postModel({ title, description, content, imageUrl, author, likes, comments, category });
            newPost.save()
                .then(savedPost => {
                    res.status(200).json({ message: "Post creado", postId: savedPost.id });
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).json({ message: "Error interno del servidor" });
                });
        });
    } catch (error) {
        console.error(error);
    }
});


router.get('/user-info', async (req, res) => {
    try
    {
        jwt.verify(req.headers.authorization, 'candado', async(error, decoded) => 
        {
            if(error)
                {
                    return res.status(401).json({ message: "No autorizado" });
                }
            req.userId = decoded.userId;
           const userInf = await usersModel.findById(req.userId);
           const userInfo = 
           {
                id:userInf._id,
                name: userInf.name,
                mail: userInf.mail,
                imageUrl: userInf.imageUrl,
                followers: userInf.followers,
                follows: userInf.follows,
                birthDate: userInf.birthDate,
                contact1: userInf.contact1,
                contact2: userInf.contact2
            };
            res.status(200).json(userInfo);
           });
        }

    catch(error)
    {
        res.status(401).json({ message: "No autorizado" });
    }
});





function generateToken(user) {
    const payload = 
    {
        userId: user._id,
    };
    const token = jwt.sign(payload, 'candado', { expiresIn: '24h' }); // Firma el token con una clave secreta y establece un tiempo de expiración
    return token;
}







module.exports = router;
