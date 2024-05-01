"use strict";
class CommentException {
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class Comment //author, content, likes, postIn el postIn es el post en el que se hizo el comentario
{
    constructor(author, content, likes, postIn)
    {
        // this._id = getUserDataBaseId(); no se si es buena idea tener un id para los comentarios, queda pendiente
        this._author = author;
        this._postIn = postIn;
        this._likes = likes;
        this._content = content;
        
    }
    //get id(){return this._id;}

    get author() 
    {

        return this._author;
    }

    get content()
    {
        return this._content;
    }

    get likes()
    {
        return this._likes;
    }

    get postIn()
    {
        return this._postIn;
    }
    
    set author(value)
    {
        if (!( value instanceof User) ||value === undefined || value === "") 
        {
            throw new CommentException("Se requiere una Usuario");
        }
        this._category = value;
    }

    set content(value)
    {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new CommentException("Se requiere un contenido");
        }
        this._content = value;
    }

    set likes(value)
    {
        if (typeof value !== "number"||value === undefined || value === "") 
        {
            throw new CommentException("Se requiere un número");
        }
        this._likes = value;
    }

    set postIn(value)
    {
        if (!( value instanceof Post) ||value === undefined || value === "") 
        {
            throw new CommentException("Se requiere un Post al que pertenece el comentario");
        }
        this._postIn = value;
    }

}

//module.exports = Comment;
