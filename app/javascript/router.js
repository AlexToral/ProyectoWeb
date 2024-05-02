"use strict";   

const express = require('express');
const router = express.Router();
const postRouter = require('./post_routes');
const adminPostRouter = require('./../routes/admin_post');
function validateAdmin(req,res,next)
{
    let adminToken = req.get('x-auth');
    if(adminToken === undefined ||adminToken!="admin")
    {
        res.status(403).send("Acceso no autorizado, no se cuenta con privilegios de administrador");
    }
    else
    {
        next();
    }
}  
router.use('/posts',postRouter);
router.use('/admin/posts',validateAdmin, adminPostRouter);
router.get('/',(req,res)=>
{
    res.send("Bienvenido a foro de ayuda mental");
}); 

 


module.exports = router;
