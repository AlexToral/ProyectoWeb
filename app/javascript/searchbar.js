"use strict";

function wordToSearchQuery(query) 
{
  query = query.replace(/ /g, "-");
  return query;
}

document.addEventListener("DOMContentLoaded", async function()
{
    const searchbar = document.getElementById("searchBar");
    const searchButton = document.getElementById("searchButton");

    searchButton.addEventListener("click", async function(event)
    {
        event.preventDefault();
        const query = wordToSearchQuery(searchbar.value);
        const response = await fetch(`/posts/${query}`);
        if (response.ok)
            {
                history.pushState(null, null, `/posts/${query}`);
                window.location.reload();
            }
        else
            {
                alert("No se encontraron resultados");
            }
    });
});

