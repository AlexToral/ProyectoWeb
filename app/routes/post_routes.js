//placeholder
"use strict";

const express = require("express");
const app = express();
const router = express.Router();
const path = require('path');
const dataHandler = (require("../javascript/datahandler"));
const postModel = require('./../schemas').BlogModel;



app.use(express.json());
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'javascript')));

router.route('/')
.get(async (req,res)=>
{  
    let page = req.query.page;
    if(page === undefined)
        {
            page = 1;
        }
    const limit = 4;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const postsPerPage = await postModel.find();
    const totalPages = Math.ceil(postsPerPage.length / limit);
    if(totalPages < page)
        {
            res.status(302).location('/posts?page=1').send();
            return;
        }
    const postssliced = postsPerPage.slice(startIndex, endIndex);
    if(postssliced == undefined)
        {
            res.status(404).send("Ya no hay mas posts")
            redirect('/posts?page=1');
        }
    else
    {
    res.send(`<!doctype html>
    <html lang="en">
    
    <head>
      <title>Blog</title>
      <!-- Required meta tags -->
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    
      <!-- Bootstrap CSS -->
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <link rel="stylesheet" href="/view/style.css" >
    </head> <body>
    <input type="hidden" id="startIndex" value="${startIndex}">
<input type="hidden" id="endIndex" value="${endIndex}">
<input type="hidden" id="limit" value="${limit}">
<input type="hidden" id="page" value="${page}">
<input type="hidden" id="totalPages" value="${totalPages}">

    
        <nav class="bgnav navbar navbar-expand-sm navbar-light"> <!--NAVBAR-->
        <a class="navbar-brand" href="home.html" id="home-link"><img src="https://th.bing.com/th/id/OIG2.mvAYZ_0sG8BPe5i4r0kB?w=1024&h=1024&rs=1&pid=ImgDetMain" style="height: 50px; width:50px"></a>
        <div class="flex-grow-1">
            <form class="form-inline my-2 my-lg-0">
              <input id="searchBar"    class="form-control col-lg-5" type="text" placeholder="Lorem Ipsum">
              <button id="searchButton" class="btn btn-info" type="submit"><i class="fa fa-search" aria-hidden="true"></i></i></button>
            </form>
          </div>
          <div class="btn-group">
            <button class="transparent_btn btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
              <a class="dropdown-item" href="#Login" data-toggle="modal">Login</a>
              <a class="dropdown-item" href="#registro" data-toggle="modal">Registrarse</a>
            </div>
          </div>
          <a id="barMenu" onclick="Sidebarcheck()"><i class="fas fa-bars"></i> </a>
        </nav> <!--NAVBAR-->
      
         <!--Login MODAL-->
      <div class="modal fade" id="Login" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-login text-white">
                    <h5 class="modal-title">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body bg-login-body">
                    <form id="formularioLogin">
                        <div class="form-group">
                            <label for="CorreoLogin">Correo</label>
                            <div class="input-group">
                                <input type="text" name="CorreoLogin" id="CorreoLogin" class="form-control"
                                    placeholder="Ingresa tu correo electrónico">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="contraseNa">Contraseña</label>
                            <div class="input-group">
                                <input type="password" name="contraseNa" id="contraseNa" class="form-control"
                                    placeholder="Ingresa tu contraseña">
                                <div class="input-group-append">
                                    <span class="input-group-text"><i class="fa fa-key" aria-hidden="true"></i></span>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block"id="loginButton">Login</button>
                        </div>
                    </form>
                    <p class="text-center">¿No tienes cuenta? <a href="#" data-dismiss="modal" data-toggle="modal"
                            data-target="#registro">Regístrate aquí</a></p>
                </div>
            </div>
        </div>
    </div>
      <!--Login MODAL-->
    
      <!--Registrarse MODAL-->
      <div class="modal fade" id="registro" tabindex="-1" role="dialog" aria-labelledby="registroTitle" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-registro text-white">
                    <h5 class="modal-title">Registro</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body bg-registro-body">
                    <form id="formularioRegistro">
                        <div class="form-group">
                            <label for="nombre1">Nombre</label>
                            <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu nombre">
                        </div>
                        <div class="form-group">
                            <label for="correoRegistro1">Correo</label>
                            <input type="email" class="form-control" id="correoRegistro" placeholder="Ingresa tu correo electrónico">
                        </div>
                        <div class="form-group">
                            <label for="contrasenaRegistro">Contraseña</label>
                            <input type="password" class="form-control" id="contraseñaRegistro" placeholder="Ingresa tu contraseña">
                        </div>
                        <div class="form-group">
                            <label for="confirmarContrasena">Confirmar Contraseña</label>
                            <input type="password" class="form-control" id="confirmarContraseña" placeholder="Confirma tu contraseña">
                        </div>
                        <button type="submit" class="btn btn-success btn-block" id="botonRegistrarse">Registrarse</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!--Registrarse MODAL-->
    
        <div class="container-fluid" > <!-- CONTENIDO-->
          <div class="row">
       
            <div class="col-md-6" id="left">  <!-- Left Sidebar -->
              
              
            </div> <!-- Left Sidebar -->
    
            <div class="col-md-4 container" id="Main_Content"> <!-- Main Content Container -->
              
            </div> <!-- Main Content Container -->
      
            <div class="col-md-2 align-items-center justify-content-end" id="right_sidebar"><!--RightSidebar-->
            
              <div class="sidebar-item">
                <a onclick="SidebarHide()"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                <span>Settings</span>
              </div>
              <div class="sidebar-item">
                <a href="createblog.html" id = "create-post-link"> <i class="fa fa-pen" aria-hidden="true">
                    <span>Crear un blog</span></i>
                </a>
              </div>
              <div class="sidebar-item">
                <a href="blog.html" id = "post-link"><i class="fas fa-newspaper fa-m fa-fw"></i>
                <span>Articulos</span>
              </a>
              </div>
              <div class="sidebar-item">
                <a href="personal_data.html" id = "profile-link"> <i class="fa fa-user" aria-hidden="true">
                    <span>Account Settings</span></i></a>
              </div>
      
      
              <div class="sidebar-item d-flex justify-content-center"> <!-- Contenedor para centrar -->
                <span>Seguidores: xxx</span>
              </div>
              
            </div> <!-- Right Sidebar -->
    
        </div> <!--CONTENIDO-->
    
        <nav aria-label="Page navigation" id="paginationContainer"> <!--Page Navigation-->
          <ul class="pagination justify-content-center">
            <li class="page-item" id="previous">
              <button class="page-link" aria-label="Previous" id="previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
              </button>
            </li>
            <li class="page-item" >
              <button  id="next" class="page-link" aria-label="Next" >
                <span aria-hidden="true">&raquo;</span>
                <span  class="sr-only">Next</span>
              </button>
            </li>
          </ul>
        </nav>
      </div> <!--Page Navigation-->
      <!-- Optional JavaScript -->
      <script src="./../javascript/sidebar.js"></script>
      <script src="./../javascript/user.js"></script>
      <script src="./../javascript/ajax-handler.js"></script>
      <script src="./../javascript/post.js"></script>
      <script src="./../javascript/searchbar.js"></script>

     
      <!-- jQuery first, then Popper.js, then Bootstrap JS -->
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
      </script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
      </script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
      </script>
      </body>
    
    </html>`);
    }
});

/* falta definir el funcionamiento o si se necesita
router.route('/posts')
.post((req,res)=>
{  
    if(!Array.isArray(req.body))
    {
        res.status(400).send("Error");
    }
    let proxies = req.body;
    let posts = [];
    for (let proxy in proxies)
    {
        posts.push(dataHandler.getProductByUUID(proxy.uuid));
    }
    if(products.length===0)
    {
        res.status(404).send("Error, no se encontraron productos");
    }
    res.status(200).json(products);
});
*/



router.route('/:id')
.get(async (req,res)=>
{  
    try {
        let postName = req.params.id;
        console.log(postName);
        postName=createPostLink(postName);
        console.log("despues create POst Link",postName);
        const post = await postModel.findOne({ title: postName });
        if (!post) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        else{
        const fecha = new Date(post.date);
        const formatoNormal = fecha.toLocaleString();
        res.send(`<!doctype html>
        <html lang="en">
        
        <head>
          <title>Inside_Blog</title>
          <!-- Required meta tags -->
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        
          <!-- Bootstrap CSS -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
          <link rel="stylesheet" href="/view/style.css">
         </head> 
         <body>
         <input type="hidden" id="postId" value="${post._id}">
            <nav class="bgnav navbar navbar-expand-sm navbar-light"> <!--NAVBAR-->
              <a class="navbar-brand" href="home.html" id="home-link"><img src="https://th.bing.com/th/id/OIG2.mvAYZ_0sG8BPe5i4r0kB?w=1024&h=1024&rs=1&pid=ImgDetMain" style="height: 50px; width:50px"></a>
              <div class="flex-grow-1">
                <form class="form-inline my-2 my-lg-0">
                  <input id="searchBar"    class="form-control col-lg-5" type="text" placeholder="Lorem Ipsum">
                  <button id="searchButton" class="btn btn-info" type="submit"><i class="fa fa-search" aria-hidden="true"></i></i></button>
                </form>
              </div>
              <div class="btn-group">
                <button class="transparent_btn btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-user-circle" aria-hidden="true"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId">
                  <a class="dropdown-item" href="#Login" data-toggle="modal">Login</a>
                  <a class="dropdown-item" href="#registro" data-toggle="modal">Registrarse</a>
                </div>
              </div>
              <a id="barMenu" onclick="Sidebarcheck()"><i class="fas fa-bars"></i> </a>
            </nav> <!--NAVBAR-->
          
             <!--Login MODAL-->
          <div class="modal fade" id="Login" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-login text-white">
                        <h5 class="modal-title">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body bg-login-body">
                        <form id="formularioLogin">
                            <div class="form-group">
                                <label for="CorreoLogin">Correo</label>
                                <div class="input-group">
                                    <input type="text" name="CorreoLogin" id="CorreoLogin" class="form-control"
                                        placeholder="Ingresa tu correo electrónico">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fa fa-user" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="contraseNa">Contraseña</label>
                                <div class="input-group">
                                    <input type="password" name="contraseNa" id="contraseNa" class="form-control"
                                        placeholder="Ingresa tu contraseña">
                                    <div class="input-group-append">
                                        <span class="input-group-text"><i class="fa fa-key" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"id="loginButton">Login</button>
                            </div>
                        </form>
                        <p class="text-center">¿No tienes cuenta? <a href="#" data-dismiss="modal" data-toggle="modal"
                                data-target="#registro">Regístrate aquí</a></p>
                    </div>
                </div>
            </div>
        </div>
          <!--Login MODAL-->
          <input type="hidden" id="postAuthor" value="${post.author}">
            <!--Registrarse MODAL-->
            <div class="modal fade" id="registro" tabindex="-1" role="dialog" aria-labelledby="registroTitle" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header bg-registro text-white">
                          <h5 class="modal-title">Registro</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body bg-registro-body">
                          <form id="formularioRegistro">
                              <div class="form-group">
                                  <label for="nombre">Nombre</label>
                                  <input type="text" class="form-control" id="nombre" placeholder="Ingresa tu nombre">
                              </div>
                              <div class="form-group">
                                  <label for="correoRegistro">Correo</label>
                                  <input type="email" class="form-control" id="correoRegistro" placeholder="Ingresa tu correo electrónico">
                              </div>
                              <div class="form-group">
                                  <label for="contraseñaRegistro">Contraseña</label>
                                  <input type="password" class="form-control" id="contraseñaRegistro" placeholder="Ingresa tu contraseña">
                              </div>
                              <div class="form-group">
                                  <label for="confirmarContraseña">Confirmar Contraseña</label>
                                  <input type="password" class="form-control" id="confirmarContraseña" placeholder="Confirma tu contraseña">
                              </div>
                              <button type="submit" class="btn btn-success btn-block" id="botonRegistrarse">Registrarse</button>
                          </form>
                      </div>
                  </div>
              </div>
          </div>
          <!--Registrarse MODAL-->
        
            <div class="container-fluid"> <!-- CONTENIDO-->
              <div class="row">
        
                <div class="col-md-9 container" id="Main_Content">
                  <div class="header"> 
                    <h1 class="text-center" id="tituloInside">${post.title}</h1>
                    <div class="row">
                      <p class="header_element">Tiempo de lectura: <span id="readTime">${post.readTime}</span></p>
                      <p class="header_element">Autor: <span id="author">${post.author}</span></p>
                      <p class="header_element">Fecha de creacion: <span id="date">${formatoNormal}</span></p>             
                      <a class="header_element" id="btn-like" onclick="stateChangeLikes()"> <i class="far fa-heart"></i></a><span id="number_of_likes">${post.likes}</span>
                      <a class="header_element" id="btn-comments" href="#comentarios" data-toggle="modal"><i class="far fa-comment" aria-hidden="true"></i> Comentarios</a> 
                    </div>
                  </div>
                  <div class="whitespace"></div>
                  <div class="inside-content d-flex justify-content-between align-items-center">
                  <span id="content" contenteditable="false">
                      ${post.content}
                  </span>
                  <div>
                    <button class="btn btn-danger" id="deleteButton" style="border-radius: 20px; margin-right: 10px;">
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button> 
                    <button class="btn btn-info" id="editButton" style="border-radius: 20px;">
                      <i class="fa fa-pen" aria-hidden="true"></i>
                    </button>
               
          <button class="btn btn-danger" id="cancelButton" style="border-radius: 20px; margin-right: 10px; display: none;">
              <i class="fas fa-times"></i> <!-- Icono de cruz -->
          </button> 
          <button class="btn btn-success" id="approveButton" style="border-radius: 20px; display: none;">
              <i class="fas fa-check"></i> <!-- Icono de palomita -->
          </button>
      </div>
                </div>
        
                            <!--COMENTARIOS-->
                
                <div class="container-fluid">
                  <div class="whitespace"></div>
                  <div class="row">
        
                    <div class="col-md-12 container" style="background-color: #e8feff;" id="Comentarios_Content"> <!--Caja de los comentarios-->
        
                      <div id="crearComentario"> <!--Caja para crear comentarios-->
                        <div class="row">
                          <div class="col-md-1"> <img class="user_comment_photo" id="commentPhoto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGzu3NaPLdn-EJx7iTK-s65246LPFfX3LGa_uPSYLCPg&s"> </div>
                          <div class="col-md-11"><input class="col-md-12 comentarioInput" type="text" placeholder="Dejanos tu opinion..." id="commentContent"> 
                            <div class="d-flex justify-content-end">
                              <button class="btn-trans" id="comentar">Comentar</button> <button class="btn-trans" id="CancelarComment">Cancelar</button>
                            </div>
                          </div>
                        </div>
                        <hr>
                      </div> <!--Caja para crear Comentarios-->
        
                      <div class="whitespace"></div> <!--Caja de los comentarios en texto-->
                      <div id="ComentariosBox">
                      <hr>
                    </div> <!--Caja de los comentarios en texto-->
                    
                  </div>
                </div> <!--Cajara de los comentarios-->
                
        
                </div> <!-- Main Content Container -->
              </div> 
              <div class="col-md-2 align-items-center justify-content-end" id="right_sidebar"><!--RightSidebar-->
                
                <div class="sidebar-item">
                  <a onclick="SidebarHide()"><i class="fa fa-arrow-left" aria-hidden="true"></i></a>
                  <span>Settings</span>
                </div>
                <div class="sidebar-item">
                  <a href="createblog.html" id = "create-post-link"> <i class="fa fa-pen" aria-hidden="true">
                      <span>Crear un blog</span></i>
                  </a>
                </div>
                <div class="sidebar-item">
                  <a href="blog.html" id = "post-link"><i class="fas fa-newspaper fa-m fa-fw"></i>
                  <span>Articulos</span>
                </a>
                </div>
                <div class="sidebar-item">
                  <a href="personal_data.html" id = "profile-link"> <i class="fa fa-user" aria-hidden="true">
                      <span>Account Settings</span></i></a>
                </div>
        
        
                <div class="sidebar-item d-flex justify-content-center"> <!-- Contenedor para centrar -->
                  <span>Seguidores: xxx</span>
                </div>
                
              </div> <!-- Right Sidebar -->
            </div> <!--CONTENIDO-->
        
          <!-- Optional JavaScript -->
          <script src="./../javascript/sidebar.js"></script>
          <script src="./../javascript/ajax-handler.js"></script>
          <script src="./../javascript/user.js"></script>
          <script src="./../javascript/insideblog.js"></script>
          <script src="./../javascript/searchbar.js"></script>



          <!-- jQuery first, then Popper.js, then Bootstrap JS -->
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous">
          </script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous">
          </script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous">
          </script>
        
          </body>
        
        </html>`);}
    } catch (error) {
        console.error('Error al obtener datos del Post:', error);
        res.status(400).json({ error: 'Error interno del servidor' });
    }
});


function createPostLink(postName)
{
    return postName.replace(/-/g, ' ');
}




module.exports = router;