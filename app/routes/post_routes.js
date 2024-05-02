//placeholder
"use strict";

const express = require("express");
const router = express.Router(); 
const dataHandler = (require("../javascript/datahandler"));


router.route('/')
.get((req,res)=>
{  
    let query = req.query.filter;

    let posts;

    if(query===undefined)
    {
        try
        {
            posts = dataHandler.getPosts();
        }
        catch(error)
        {
            res.status(400).send("Error");
        }
        res.status(200).json(posts);
    }
    else
    {
        posts = dataHandler.findPost(query);
    }

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
    if(req.params.id===undefined)
    {
        res.status(400).send("Error");
    }
    let post = dataHandler.getPostByID(req.params.id);
    if (post===undefined)
    {
        res.status(404).send("Error, no se encontro el producto");
    }
    res.status(200).json(post);
});


module.exports = router;