

document.addEventListener('DOMContentLoaded', async function() 
{
    try
    {
        var Userinfo;
       const userInfo = await fetch('/user-info',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')},
       });
       if(userInfo.ok)
       {
           Userinfo = await userInfo.json();
           console.log(Userinfo.name);
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
                        document.getElementById('profilePicture').src='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                    }
                    else
                    {
                        document.getElementById('profilePicture').src = Userinfo.imageUrl;
                    }
       }
    }


    catch (e) 
    {
        console.error('Error:', e);
    }
});