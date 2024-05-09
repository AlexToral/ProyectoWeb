
let id;

document.addEventListener('DOMContentLoaded', async function() 
{
    try
    {
       let Userinfo;
       const userInfo = await fetch('/user-info',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')},
       });
       if(userInfo.ok)
       {
           Userinfo = await userInfo.json();
           console.log(Userinfo.imageUrl);
           id = Userinfo.id;
           document.getElementById('nameInp').value = Userinfo.name;
           document.getElementById('emailInp').value = Userinfo.mail;
           if(!Userinfo.contact1)
           {
               document.getElementById('contact1').value = "";
           }
           else
              {
                document.getElementById('contact1').value = Userinfo.contact1;
              }
              if(!Userinfo.contact2)
              {
                  document.getElementById('contact2').value = "";
              }
                else
                {
                    document.getElementById('contact2').value = Userinfo.contact2;
                }
                
                if(!Userinfo.imageUrl)
                    {
                        document.getElementById('previewProfilePic').src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                    }
                    else
                    {
                        document.getElementById('previewProfilePic').src = Userinfo.imageUrl;
                    }
                    let GreetingsUser = document.getElementById("userGreeting");
                    GreetingsUser.textContent = "Hola "+ Userinfo.name;


       }
    }


    catch (e) 
    {
        console.error('Error:', e);
    }
});

document.addEventListener('DOMContentLoaded', async function () {
   
    

    

    const submitChanges = document.getElementById('ConfirmChanges');
    submitChanges.addEventListener('click', async function (event) {
        let cancel = document.getElementById("cancel");
        let edit = document .getElementById("edit");
        submitChanges.style.display = "none";
        cancel.style.display = "none";
        edit.style.display = "block";
        event.preventDefault();
        console.log(id);
        const diruser = '/users/'+id;
        console.log(diruser);

        let userName = document.getElementById('nameInp').value;
        let userMail = document.getElementById('emailInp').value;
        let userDate = document.getElementById('datInp').value;
        let userImage = document.getElementById('profilePicture').value;
        let userContact1 = document.getElementById('contact1').value;
        let userContact2 = document.getElementById('contact2').value;

        let updateUser = {
            id:id,
            name: userName,
            mail:userMail,
            birthDate:userDate,
            imageUrl:userImage,
            contact1:userContact1,
            contact2:userContact2
        };

        for (let key in updateUser) {
            if (updateUser.hasOwnProperty(key) && !updateUser[key]) {
                try {
                    const response = await fetch(diruser);
                    if (!response.ok) {
                        throw new Error('Error al obtener datos del usuario');
                    }
                    const userData = await response.json();
                    const value = userData[key];
                    console.log(key, "Falta", value);
                    updateUser[key] = value;
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                }
            }
        }
        console.log(updateUser);

        try {
            console.log("Actualizando Datos...");
            const response = await fetch ('users', 
            {
                method: 'PUT',
                headers: 
                {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateUser)
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error("Error al actualizar el Usuario: ", errorMessage);
            } else {
                const previewImage = document.getElementById("previewProfilePic");
                const response = await fetch(diruser);
                const data = await response.json();
                previewImage.src = data.imageUrl;

            }
        } catch (error) {
            console.error("Error al actualizar Usuario", error);
        }
    });
});

function cancel() {
    console.log("hola");
    location.reload();
}


function edit(){
    let accept = document.getElementById("ConfirmChanges");
    let cancel = document.getElementById("cancel");
    let edit = document .getElementById("edit");

    accept.style.display = "block";
    cancel.style.display = "block";
    edit.style.display = "none";
}