"use strict";
let sb = document.getElementById("right_sidebar");

function Sidebarcheck(){
    
    console.log("HOLA");

    if(sb.style.display != "none"){
        SidebarHide()
    }else{
        sb.style.display = "block";
    }
}

function SidebarHide(){
    sb.style.display = "none";
}
