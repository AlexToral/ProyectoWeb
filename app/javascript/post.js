"use strict";
class PostException {
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Post //title, description,content, imageUrl, author, likes, comments, category
{
    constructor( title, description,content, imageUrl, author, category)
    {
        //this._id = getPostDataBaseId();
        this._title = title;
        this._description = description;
        this._content = content;
        this._imageUrl = imageUrl;
        this._author = author;
        this._likes = 0;
        this._comments = 0;
        this._category = category;
    }

    get id()
    {
        return this._id;
    }

    get title() 
    {

        return this._title;
    }


    get description() 
    {
        return this._description;
    }

    get imageUrl() 
    {
        return this._imageUrl;
    }

    get author() 
    {
        return this._author;
    }

    get likes() 
    {
        return this._likes;
    }

    get comments() 
    {
        return this._comments;
    }

    get category() 
    {
        return this._category;
    }

    get content() 
    {
        return this._content;
    }


    set id(value) 
    {
        throw new PostException("ID is read-only");
    }

     set title(value)
     {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new PostException("Se requiere un título");
        }
        this._title = value;
     }

     set description(value)
     {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new PostException("Se requiere una descripción");
        }
        this._escription = value;
     }

     set content(value)
        {
            if (typeof value !== "string"||value === undefined || value === "") 
            {
                throw new PostException("Se requiere un contenido");
            }
            this._content = value;
        }

        set imageUrl(value)
        {
            if (typeof value !== "string"||value === undefined || value === "") 
            {
                throw new PostException("Se requiere una imagen");
            }
            this._imageUrl = value;
        }
    set author(value)
    {
        if (!( value instanceof User) ||value === undefined || value === "") 
        {
            throw new PostException("Se requiere un autor");
        }
        this._author = value;
    }

    set likes(value)
    {
        if (typeof value !== "number" || value === undefined || value < 0) 
        {
            throw new PostException("Se requiere numeros negativos");
        }
        this._stock = value;
    }

    set comments(value)
    {
        if (typeof value !== "number" || value === undefined || value <= 0) 
        {
            throw new PostException("Se requiere numeros negativos");
        }
        this._pricePerUnit = value;
    }

    set category(value)
    {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new PostException("Se requiere una categoria");
        }
        this._category = value;
    }
}
module.exports = Post;