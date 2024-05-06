"use strict";   

const express = require('express');
const router = express.Router();
const postRouter = require('../routes/post_routes');
const adminPostRouter = require('./../routes/admin_post');


//router.use(userLogIn);

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
module.exports = router;
