import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../../Classes/Method/ViewMethodClass";

export default new MethodInfoClass( 
      "Авторизація користувачів", 
      "GET",
      "Після введення правильного логіну та пароля, система дозволяє користувачу увійти. Підписує користувача на токен, що був виданий до цього",
      ConnectionName.Client, 
      new MethodFormClass( 
        true,
        [ 
          new MethodFieldClass("login", "логін", "text", ""), 
          new MethodFieldClass("password", "пароль", "password", "") 
        ],
        function (connection, event) {
          //GET  UserAgent 
          const userAgent = navigator.userAgent; 
          //GET form
          const form = event.target;
          const login = form.elements['login'].value;
          const password = form.elements['password'].value;
          const data = { "data": {"login": login, "password": password}, "user_agent": userAgent}

          // GET Salt
          const salt = localStorage.getItem('dc_server_salt');
          //GET token 
          const token = localStorage.getItem('dc_auth_key');
          if( salt == null || token == null ) {
              alert("User did not receive unique tokens")
              return;
          }
          
          return AES.encrypt(JSON.stringify(data), salt).then( (value) => {
            const url = `${connection}/${encodeURIComponent(value.encrypted)}/${encodeURIComponent(value.iv)}`;
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then( (response) => response.json() )
            .then(res => {
              if(res.meta.code === 200) {
                  localStorage.setItem("user_data", JSON.stringify(res.data));
              }
              return res;
            })
          })
        } 
    ),
    [true, true, true],
    new ViewMethodClass("method-template/client/user_data/user_data.html","")
  )