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



    document.addEventListener('DOMContentLoaded', async function() {
        const acceptCreatePost= document.getElementById('CreateAccept');
        const left = document.getElementById('left');
        try
        {
            const posts = await fetch ('/display-posts', {
                method: 'GET',
            headers:{
                'Content-Type': 'application/json'},
            });
            if(posts.ok)
                {
                    const postsResponse = await posts.json();
                    console.log(postsResponse);
                     left.innerHTML = `<div class="whitespace"></div>\n` + postsResponse.map(postToHTML).join('');
                    
                }
            else if(!posts.ok)
            {
                const errorMessage = await posts.text();
                console.error("Error al cargar los posts: ", errorMessage);
            }
        }
        catch(e)
        {
            alert(e.errorMessage);
        }
        acceptCreatePost.addEventListener('click', async function(event) 
        {
            event.preventDefault();
            var title =document.getElementById('CreateTitle').value;
            var content =document.getElementById('CreateText').value;
            var image = document.getElementById('CreateImage').value;
            var userid= localStorage.getItem('token');

            var newPost = {title: title, description: " ", content: content, imageUrl: image, author: userid, likes: 0, comments: 0, category: " "};
            try{
                const response = await fetch('/post-create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(newPost)
            });
            if (response.ok) {
                const newPostResponse = await response.json();
                fetch('/posts')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                // Insertar el HTML de la página en el cuerpo del documento
                document.body.innerHTML = html;
                history.pushState(null, '', '/home');
                window.location.reload();
            })
            .catch(error => {
                console.error('Error fetching page:', error);
            });
            }
            else if(!response.ok) {
                const errorMessage = await response.text();
                console.error("Error al crear el post: ", errorMessage);
            }
        }

            catch(e)
            {
                alert(e.errorMessage);
            }
        });
});
function postToHTML(post)
{
    return `<div class="cardBody col-md-12">
    <div class="row">
    <input type="hidden" id="postId" value="${post._id}">
      <img class="card-img" src="${post.imageUrl}">
      <h3 class="cardTitle">${post.title}</h3>
      <p class="cardText">${post.description}</p>
    </div>
  </div>
  <div class="whitespace"></div>
    `;
}

