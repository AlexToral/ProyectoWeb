"use strict";   

const express = require('express');
const router = express.Router();
const postRouter = require('../routes/post_routes');
const adminPostRouter = require('./../routes/admin_post');


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


router.post('/users', async (req, res) => 
    {
        try
        {
           const {id, name, mail, imageUrl, followers, follows, birthDate, contact1, contact2} = req.body;
           const checkname = await usersModel.findOne({name: name});
           if(checkname)
           {
               res.status(400).send("Error, el nombre de usuario ya existe");
           }
           else{
           const user = new usersModel({name, mail, imageUrl, followers, follows, birthDate, contact1, contact2});
            user.save();
            res.status(200).json({ message: "Usuario creado", userId: user.id });
           }
        }
        catch(error)
        {
            res.status(500).send("Error");
        }
    });


router.post('/login', async (req, res) => 
    {
        try
        {
            console.log(req.body,"login ininini");
            const {mail, password} = req.body;
            console.log("login nombre: ",mail);
            console.log("login password: ",password);
            const user = await usersModel.findOne({mail: mail});
            console.log(user);
            if(user)
            {
                if(user.password === password)
                {
                    res.status(200).json({message: "Usuario logeado", userId: user.id});
                }
                else
                {
                    res.status(400).send("Error, contraseña incorrecta");
                }
            }
            else
            {
                res.status(404).send("Error, usuario no encontrado");
            }
            
        }
        catch(error)
        {
            res.status(500).send("Error");
        }
    });





module.exports = router;
