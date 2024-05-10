"use strict";

function getSessionStorage()
{
   let storedPost =  sessionStorage.getItem("postId");
   return storedPost;
}



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