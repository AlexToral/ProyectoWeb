"use strict";

let button = document.getElementById("btn-like");

let isLiked = false;

function stateChange(){
   if (isLiked) {
      button.innerHTML = "<i class='far fa-heart'></i>";
      isLiked = false;
   } else {
      button.innerHTML = "<i class='fa fa-heart' aria-hidden='true'></i>";
      isLiked = true;
   }
}