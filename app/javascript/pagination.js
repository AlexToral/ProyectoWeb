"use strict";

document.addEventListener('DOMContentLoaded', async function() {
const previous = document.getElementById('previous');
const next = document.getElementById('next');
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

});