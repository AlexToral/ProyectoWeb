"use strict";

//Sidebar 
let sb = document.getElementById("right_sidebar");

function Sidebarcheck(){

    if(sb.style.display != "none"){
        SidebarHide()
    }else{
        sb.style.display = "block";
    }
}

function SidebarHide(){
    sb.style.display = "none";
}
//End of Sidebar

//Inside_blog Buttons
let like_button = document.getElementById("btn-like");

let isLiked = false;

function stateChangeLikes(){
   if (isLiked) {
      like_button.innerHTML = "<i class='far fa-heart'></i>";
      isLiked = false;
   } else {
      like_button.innerHTML = "<i class='fa fa-heart' aria-hidden='true'></i>";
      isLiked = true;
   }
}
//Inside_blog Buttons end