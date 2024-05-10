"use strict";

function getSessionStorage()
{
   let storedPost =  sessionStorage.getItem("postId");
   return storedPost;
}

 function  getSessionStorageById()
{
   let PostId = document.getElementById('postId').value;
   return PostId;
}




document.addEventListener('DOMContentLoaded', async function() 
{
    console.log('Inside blog');
    const postAuthor = document.getElementById('postAuthor').value;
    const edit= document.getElementById('editButton');
    const deletePost = document.getElementById('deleteButton');
    try{
       const userInfoResponse= await fetch('/user-info',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')},
        });
        const userInfo = await userInfoResponse.json();   
        console.log(userInfo.name);     
        if(userInfoResponse.ok)
        {
            console.log('inside blog ok ');
            if(userInfo.name == postAuthor)
            {
                console.log('jamaica');
                edit.style.display = 'block';
                deletePost.style.display = 'block';
            }
            else
            {
               edit.style.display = 'none'; // Ocultar el botón
                deletePost.style.display = 'none';

            }
        }
        else if(!userInfoResponse.ok)
        {
            console.log('Error al cargar los posts');
            const errorMessage = await userInfo.text();
            console.error("Error al cargar los posts: ", errorMessage);
        }
    }
    catch(e)
    {
        console.error('Error:', e);
    }
    deletePost.addEventListener('click', async function(event)
    {
        event.preventDefault();
        try{
            const deleteInfo= await fetch('/post-delete', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    id: getSessionStorageById()
                })
        });
        if(deleteInfo.ok)
        {
            console.log('Post eliminado');
            history.pushState(null, '', '/posts');
            window.location.reload();
        }
        else if(!deleteInfo.ok)
        {
            const errorMessage = await deleteInfo.text();
            console.error("Error al eliminar el post: ", errorMessage);
        }
        }
        catch(e)
        {
            console.error('Error:', e);
        }
    });

    edit.addEventListener('click', async function(event)
    {

        event.preventDefault();
        edit.style.display = 'none'; // Ocultar el botón
        deletePost.style.display = 'none';
        const cancel = document.getElementById('cancelButton');
        const accept = document.getElementById('approveButton');
        cancel.style.display = 'block';
        accept.style.display = 'block';
        const titleElement = document.getElementById('tituloInside');
        titleElement.setAttribute('contenteditable', 'true');
        const editContent = document.getElementById('content');
        editContent.contentEditable = 'true';
        editContent.style.border = '2px solid #ccc'; // Borde de 2px de grosor y color gris
        editContent.style.padding = '5px';
        editContent.addEventListener('focus', function() {
            this.style.borderColor = 'blue'; // Cambiar el color del borde al enfocar
        });
        titleElement.style.border = '2px solid #ccc'; // Borde de 2px de grosor y color gris
        titleElement.style.padding = '5px';
        titleElement.addEventListener('focus', function() {
            this.style.borderColor = 'blue'; // Cambiar el color del borde al enfocar
        });
        accept.addEventListener('click', async function(event)
        {
        try{
            const updateInfo= await fetch('/post-update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    id: getSessionStorageById(),
                    title: titleElement.textContent,
                    content: editContent.textContent
                })
        });
        if(updateInfo.ok)
        {
            console.log('Post actualizado');
            history.pushState(null, '', '/posts');
            window.location.reload();
        }
        else if(!updateInfo.ok)
        {
            const errorMessage = await updateInfo.text();
            console.error("Error al actualizar el post: ", errorMessage);
        }
        }
        catch(e)
        {
            console.error('Error:', e);
        }
        });
    });

    
});

function createPostLink(postName) {
    postName = postName.replace(/%20/g, ' ');
    postName = postName.replace(/ /g, '-');
    return postName;
}