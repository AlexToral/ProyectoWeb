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
