"use strict";
const express = require("express");
const router = express.Router();

const dataHandler = require("./../javascript/datahandler");


router.route("/")
.post((req,res)=>
{  
    let post = req.body;
    if (post === undefined)
    {
        res.status(400).send("Error");
    }
    try
    {
        dataHandler.createPost(user);
    }
    catch(error)
    {
        res.status(400).send("Error");
    }
    res.status(200).send("Post creado: " + post.id);
});


router.route("/:id")
.put((req,res)=>
{
    let id = req.params.id;
    let post = req.body;
    if (post === undefined)
    {
        res.status(400).send("Error");
    }
    try
    {
        dataHandler.updatePost(id,product);
    }
    catch(error)
    {
        res.status(400).send("Error");
    }
    res.status(200).send("Post actualizado: " + post.id);

})

.delete((req,res)=>
{
    let id = req.params.id;
    if (id === undefined)
    {
        res.status(400).send("Error");
    }
    try
    {
        dataHandler.deleteProduct(id);
    }
    catch(error)
    {
        res.status(404).send("Error, el post no existe");
    }
    res.status(200).send("Post eliminado");
});

module.exports = router;