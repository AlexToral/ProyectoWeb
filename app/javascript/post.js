"use strict";
let currentPage = 1;
let postsPerPage = 4;
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


    function delSessionStorage(){
        sessionStorage.removeItem("postId");
    }

    delSessionStorage();
    
    document.addEventListener('DOMContentLoaded', async function() {
        const acceptCreatePost= document.getElementById('CreateAccept');
        const pagination = document.getElementById('paginationContainer');
        const previous = document.getElementById('previous');
        const left = document.getElementById('left');
        const next = document.getElementById('next');

    
        console.log(next);
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
                    const total = postsResponse.length;
                    left.innerHTML = `<div class="whitespace"></div>\n${postsResponse.slice(document.getElementById('startIndex').value, document.getElementById('endIndex').value).map(postToHTML).join('')}`;
                    
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
        previous.addEventListener('click',  function(event) 
        {
            console.log("previous?");
            if(document.getElementById('page').value > 1)
            {
                history.pushState(null, '', '/posts?page=' + (parseInt(document.getElementById('page').value) - 1));
                window.location.reload();                 }
            else
            {
                alert('No hay más páginas');
            }
        });
        next.addEventListener('click', function(event) 
        {
            console.log("next?");

            if(document.getElementById('page').value < document.getElementById('totalPages').value)
            {
                history.pushState(null, '', '/posts?page=' + (parseInt(document.getElementById('page').value) + 1));
                window.location.reload();     
            }
            else
            {
                alert('No hay más páginas');
            }
        });     
        if(acceptCreatePost === null)
        {
            console.log("No hay botón de crear post");
        }
        else
        {
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
    }
    var preview = document.getElementById('Main_Content'); 
    if(preview === null)
        {
            console.log("No hay botón de preview");
        }
        else{
        preview.addEventListener('click', async function(event) 
        {
            event.preventDefault();
            console.log("preview?");
            var postName = document.getElementById('postName').value;
            console.log(postName);
                const response = await fetch ('/posts/'+postName);
                if(response.ok)
                {
                    removeAllEventListeners(preview);
                    console.log("Post encontrado");
                    history.pushState(null, '', '/posts/'+createPostLink(postName));
                    window.location.reload();
                }
                else if(!response.ok)
                {
                    const errorMessage = await response.text();
                    console.error("Error al obtener el post: ", errorMessage);
                }
            });
        }
        });


async function loadPreviewPosts(id){
    const previewContainer = document.getElementById("Main_Content");
    previewContainer.innerHTML = await previewPost(id);
}

function saveInsideblog(id){
    sessionStorage.setItem("postId",id);
    }

async function previewPost(id){
    console.log("Hola",id);
    const postUrl = "/posts-preview/"+id;
    let post = await fetch(postUrl);
    let postData = await post.json();
    const fecha = new Date(postData.date);
    const formatoNormal = fecha.toLocaleString();

    return `
    <input type="hidden" id="postName" value="${postData.title}">
          <div class="whitespace"></div>
          <div class="card text-left">
          <img class="card-img-preview" src="${postData.imageUrl}">
            <div class="card-body">
            <a href ="inside_blog.html" id="insidepostlink" onclick="saveInsideblog('${id}')"><h4 class="card-title tarjeta">${postData.title}</h4></a>
              <p class="card-text">${postData.content}</p>
              <p>AUTOR: ${postData.author}</p>
              <p>FECHA: ${formatoNormal}</p>
              <p>TEMAS: ${postData.category}</p>
            </div>
          </div>
    `
}

function postToHTML(post)
{
    return `<div class="cardBody col-md-12">
    <div class="row">
    <input type="hidden" id="postId" value="${post._id}">
    <button class="transparent_btn" onclick="loadPreviewPosts('${post._id}')"><img class="card-img" src="${post.imageUrl}"></button>
      <h3 class="cardTitle">${post.title}</h3>
      <p class="cardText">${post.description}</p>
    </div> 
  </div>
  <div class="whitespace"></div>
    `
    ;
}

function createPostLink(postName) {
    postName = postName.replace(/%20/g, ' ');
    postName = postName.replace(/ /g, '-');
    return postName;
}

function removeAllEventListeners(element) {
    var clone = element.cloneNode(true); // Clona el elemento para preservar sus propiedades
    element.parentNode.replaceChild(clone, element); // Reemplaza el elemento original con su clon
}

