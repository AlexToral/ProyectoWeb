"use strict";
class UserException {
    constructor(errorMessage){
        this.errorMessage = errorMessage;
    }
}

class User //id, name, mail, imageUrl, followers, follows, birthDate, contact1, contact2
{
    constructor(name, mail, password)
    {
        //this._id = getUserDataBaseId();
        this._name = name;
        this._mail = mail;
        this._password = password;
        this._imageUrl = "";
        this._followers = [];
        this._followersNum = 0;
        this._follows = [];
        this._followsNum = 0;
        this._birthDate = "";
        this._contact1 = "";
        this._contact2 = "";
    }


    get name() 
    {

        return this._name;
    }

    get password()
    {
        return this._password;
    }


    get mail() 
    {
        return this._mail;
    }

    get imageUrl() 
    {
        return this._imageUrl;
    }

    get followers() 
    {
        return this._followers;
    }

    get follows() 
    {
        return this._follows;
    }

    get followersNum()
    {
        return this._followersNum;
    }
    
    get followsNum()
    {
        return this._followsNum;
    }

    get birthDate()
    {
        return this._birthDate;
    }

    get contact1()
    {
        return this._contact1;
    }

    get contact2()
    {
        return this._contact2;
    }


    set id(value) 
    {
        throw new UserException("ID is read-only");
    }

    set password(value)
    {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new UserException("Se requiere una contraseña");
        }
        this._password = value;
    }

     set name(value)
     {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new UserException("Se requiere un título");
        }
        this._title = value;
     }

     set mail(value)
     {
        if (typeof value !== "string"||value === undefined || value === "") 
        {
            throw new UserException("Se requiere una correo");
        }
        this._escription = value;
     }

        set imageUrl(value)
        {
            if (typeof value !== "string"||value === undefined || value === "") 
            {
                throw new UserException("Se requiere una imagen");
            }
            this._imageUrl = value;
        }

    set followers(value)
    {
        throw new UserException("Un nuevo usuario no tiene seguidores")    
    }

    set follows(value)
    {
        throw new UserException("Un nuevo usuario no sigue a nadie")    
    }

    set followersNum(value)
    {
        throw new UserException("Un nuevo usuario no tiene seguidores")    
    }

    set followsNum(value)
    {
        throw new UserException("Un nuevo usuario no sigue a nadie")    
    }

    set birthDate(value)
    {
        if (!( value instanceof Date)||value === undefined || value === "") 
        {
            throw new UserException("Se requiere una fecha de nacimiento valida");
        }
        this._birthDate = value;
    }

    static createUser(name, mail, password)
    {
        return new User(name, mail, password);
    }

    static createUserFromObject(userJson)
    {
        let newUser = {};
        Object.assign(newUser, userJson);
        User.cleanObject(userJson);
        this.createUser(userJson._name, userJson._mail, userJson._password);
    }

    static cleanObject(jsonValue)
    {
        const properties = ["_id, _name, _mail, _imageUrl, _followers, _follows, _birthDate, _contact1, _contact2"];
        for (let prop in jsonValue) 
        {
            if (!properties.includes(prop)) 
            {
                delete jsonValue[prop];
            }
        }
    }

    static createUserFromJSON(jsonValue)
    {
        let obj = JSON.parse(jsonValue);
        return User.createUserFromObject(obj);
    }

}

document.addEventListener('DOMContentLoaded', function() {
    const createUserButton = document.getElementById('botonRegistrarse');
    createUserButton.addEventListener('click', async function(event) {
        event.preventDefault();
        
        var name = document.getElementById('nombre').value;
        var mail = document.getElementById('correoRegistro').value;
        
        if (document.getElementById('contraseñaRegistro').value != document.getElementById('confirmarContraseña').value) {
            alert("Las contraseñas no coinciden");
            return;
        }
        
        var password = document.getElementById('contraseñaRegistro').value;
        
        // Crear un objeto JavaScript directamente con los datos del usuario
        var newUser = { name: name, mail: mail, password: password };        
        try {
            console.log('Creando nuevo usuario...');
            const response = await fetch('/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
        
            });
            console.log('Se creo el usuario');
            
            if(response.ok) {
                const newUserResponse = await response.json();
                $('#formularioRegistro')[0].reset();
                $('#registro').modal('hide');
            } else if(!response.ok) {
                const errorMessage = await response.text();
                console.error("Error al crear el usuario else if: ", errorMessage);
            }
        } catch(error) {
            console.error("Error al crear el usuario: ", error);
        }
    });
});



