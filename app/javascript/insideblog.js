"use strict";

let id;
let imageUrl;

function getSessionStorage()
{
   let storedPost =  sessionStorage.getItem("postId");
   return storedPost;
}
let postId;



document.addEventListener('DOMContentLoaded', async function() {
    let postId = getSessionStorage();
    let postUrl = "posts/"+postId;

    const post = await fetch(postUrl);
    if(post.ok)
    {

    }
    if(!post.ok){
        throw new Error('Error al obtener el post');
    }
    console.log("titulo",postData.title);
    history.pushState(null, '', '/posts/'+createPostLink(postData.title));

    

    let Title = document.getElementById("tituloInside");
    let readTime = document.getElementById("readTime");
    let author = document.getElementById("author");
    let date = document.getElementById("date");
    let number_of_likes = document.getElementById("number_of_likes");
    let content = document.getElementById("content");

    const fecha = new Date(postData.date);
    const formatoNormal = fecha.toLocaleString();

    Title.textContent = postData.title;
    readTime.textContent = postData.readTime;
    author.textContent = postData.author;
    date.textContent = formatoNormal;
    number_of_likes.textContent = postData.likes;
    content.textContent = postData.content;

    

document.addEventListener('DOMContentLoaded', async function() {
    

    let commentsUrl = '/comment/'+postId;
    console.log(commentsUrl);

    try {
        let response = await fetch(commentsUrl);
        let commentsArray = await response.json();

        // Array para almacenar promesas
        let userPromises = [];

        // Iterar sobre los comentarios y hacer solicitudes de usuario
        commentsArray.forEach((element) => {
            let userUrl = '/users/' + element.author;
            let userPromise = fetch(userUrl)
                .then(response => response.json())
                .then(user => {
                    element.imageUrl = user.imageUrl;
                    element.name = user.name;
                    if(id != element.author){
                        element.display = "hidden";
                    }else element.display = "visible";
                })
                .catch(error => console.error('Error fetching user data:', error));

            userPromises.push(userPromise);
        });

        // Esperar a que todas las solicitudes de usuario se completen
        await Promise.all(userPromises);

        let commentBox = document.getElementById("ComentariosBox");
        console.log(commentsArray);
        commentBox.innerHTML = `${commentsArray.map(commentToHTML).join('')}`;

        commentsArray.forEach(comment => {
            const editButton = document.getElementById(`editComment${comment._id}`);
            const spanEditComment = document.getElementById(`content${comment._id}`);
            const inputEditComment = document.getElementById(`editInput${comment._id}`);
            const confirmComment = document.getElementById(`confirmChanges${comment._id}`);
            const cancelComment = document.getElementById(`cancelChanges${comment._id}`);
            const deleteComment = document.getElementById(`deleteComment${comment._id}`);
            const allComment = document.getElementById(`allComment${comment._id}`);

            editButton.addEventListener('click', function() {
                editButton.style.visibility = "hidden";
                confirmComment.style.visibility = "visible";
                cancelComment.style.visibility = "visible";
                deleteComment.style.visibility = "visible";


                spanEditComment.style.visibility = "hidden";
                inputEditComment.style.visibility = "visible";

                confirmComment.addEventListener('click', async function (event) {
                    let commentid = comment._id;
                    
                    console.log(commentid);
                    let content = inputEditComment.value;
                    console.log(content.length);

                    spanEditComment.innerText = content;

                    let updateComment = {
                        id:commentid,
                        content:content
                    }
                    try{
                        console.log("Actualizando el comentario");
                        const response = await fetch('/comment',{
                            method:'PUT',
                            headers:
                            {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(updateComment)
                        });
                        console.log("Se actualizo de manera correcta");

                    }catch (error){
                        console.error("No se pudo Actualizar el comentario");
                    }
                    editButton.style.visibility = "visible";
                    confirmComment.style.visibility = "hidden";
                    cancelComment.style.visibility = "hidden";
                    deleteComment.style.visibility = "hidden";

                    
                    spanEditComment.style.visibility = "visible";
                    inputEditComment.style.visibility = "hidden";
                    
                });

                deleteComment.addEventListener('click', async function (event) {
                    let deletedComment = {id:comment._id};
                    try{
                        console.log("Eliminando el comentario");
                        const response = await fetch('/comment',{
                            method:'DELETE',
                            headers:
                            {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(deletedComment)
                        });
                        console.log("Se elimino de manera correcta");

                    }catch (error){
                        console.error("No se pudo eliminar el comentario");
                    
                    }
                    allComment.style.display = "none";
                    confirmComment.style.display = "none";
                    cancelComment.style.display = "none";
                    deleteComment.style.display = "none";
                    inputEditComment.style.display = "none";
                });

                cancelComment.addEventListener('click', async function (event) {
                    location.reload();
                });

            });
        });
        

    } catch (error) {
        console.error("No se pudo cargar los comentarios:", error);
    }

});

    const submitComment = document.getElementById("comentar");
    submitComment.addEventListener('click', async function (event) {
        let author = id;
        let postIn = getSessionStorage();
        let content = document.getElementById("commentContent").value;
        

        let newComment = {
            author:author,
            postIn:postIn,
            content:content
        }
        try{
            console.log("Subiendo comentario...");
            const response = await fetch('/comment',
                {
                    method:'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newComment)
                });
                if(!response.ok){
                    const errorMessage = await response.text();
                    console.error("Error al subir el comentario: ", errorMessage);
                }
                console.log("Se subio el comentario...");
            
        } catch (error){
            console.error("No se pudo subir tu comentario",error);
        }
        document.getElementById("commentContent").value = "";
    })
    const cancelComment = document.getElementById("CancelarComment");
    cancelComment.addEventListener('click', async function (event) {
        document.getElementById("commentContent").value = "";
    })

});


function createPostLink(postName) {
    postName = postName.replace(/%20/g, ' ');
    postName = postName.replace(/ /g, '-');
    return postName;
}

function commentToHTML(comment)
{
    return `
    <div id="allComment${comment._id}">
    <div class="row">
    <input type="hidden" id="commentId" value="${comment._id}">
    <div class="col-md-1"> <img class="user_comment_photo" src="${comment.imageUrl}"> </div>
    <div class="col-md-11"><span>${comment.name}</span>
    <br> 
    <span id="content${comment._id}">${comment.content}</span><input class=" class="col-md-12 comentarioInput" "type="text" style="visibility:hidden" id="editInput${comment._id}">
    <div class="d-flex justify-content-end">
      <button class="btn-danger" id="deleteComment${comment._id}" style="border-radius: 20px; margin-right: 10px; visibility:hidden;"><i class="fa fa-trash" aria-hidden="true"></i></button> 
      <button class="btn-info" id="editComment${comment._id}" style="border-radius: 20px; visibility:${comment.display};"><i class="fa fa-pen" aria-hidden="true"></i></button> 
      <button class="btn-trans" id="confirmChanges${comment._id}" style="visibility:hidden;">Confirmar</button> 
      <button class="btn-trans" id="cancelChanges${comment._id}" style="visibility:hidden">Cancelar</button>
    </div>
    </div>
    
</div>
<hr>
</div>
    `
}
