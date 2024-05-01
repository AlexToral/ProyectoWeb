"use strict";
console.log("Pruebas de Usuarios");


let andrea = new User("Andrea", "montana@tiktok.com", "1234");
let postAndrea= new Post("Tips contra la ansiendad", "Psicologa Andrea comparte tips contra la ansiedad", "Lorem ipsum dolor sit amet, consectetur adipiscing elit","https://th.bing.com/th/id/OIP.aP1QEGrSl4xvyA_IvY3xCwHaEl?rs=1&pid=ImgDetMain", andrea, "Ansiedad");
let haterdeAndrea = new User("Jaime", "soyhater@hotmail.com", "1234");
let comentarioHater = new Comment(haterdeAndrea, "que mal post no sirve de nada", postAndrea);
console.log(postAndrea);
console.log(comentarioHater);

let jsonAndrea = userToJson(andrea);
console.log(jsonAndrea);
console.log(andrea); 
console.log(userToJson(andrea));
