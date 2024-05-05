//placeholder
"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const dataHandler = (require("../javascript/datahandler"));


app.use(express.json());
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'javascript')));

router.route('/')
.get((req,res)=>
{  
    res.sendFile(path.join(__dirname,'..','view','blog.html'));

});

/* falta definir el funcionamiento o si se necesita
router.route('/posts')
.post((req,res)=>
{  
    if(!Array.isArray(req.body))
    {
        res.status(400).send("Error");
    }
    let proxies = req.body;
    let posts = [];
    for (let proxy in proxies)
    {
        posts.push(dataHandler.getProductByUUID(proxy.uuid));
    }
    if(products.length===0)
    {
        res.status(404).send("Error, no se encontraron productos");
    }
    res.status(200).json(products);
});
*/


router.route('/:id')
.get((req,res)=>
{  
    res.sendFile(path.join(__dirname,'..','view','inside_blog.html'));

});


module.exports = router;