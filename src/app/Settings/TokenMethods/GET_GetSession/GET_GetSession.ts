import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Отримання всіх сесій [session/{clientId}]", 
      "GET",
      "Використовується для отримання всіх сесій, що підєднані до даного користувача",
      ConnectionName.Token, 
      new MethodFormClass( 
        true,
        [ 
        ],
        function (connection, event) {
          //отримання  UserAgent
          const userAgent = navigator.userAgent; 
          //отримання даних
          const userDataString = localStorage.getItem('user_data') ?? "";
          if(userDataString === "") return  new Promise((resolve, reject) => { resolve("User Data Null"); })
          const userData = JSON.parse(userDataString);
          const userId = userData.id;
          
          const data = { "data": { "client_id": userId }, "user_agent": userAgent };

          // отримання солі
          const salt = localStorage.getItem('dc_server_salt');
          //Отримання токену
          const token = localStorage.getItem('dc_auth_key');
          if( salt == null || token == null ) {
              alert("Користувач не отримав унікальні токени")
              return;
          }

          return AES.encrypt(JSON.stringify(data), salt).then( (value) => {
            const url = `${connection}/session/${encodeURIComponent(value.encrypted)}/${encodeURIComponent(value.iv)}`;
            return fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }).then( (response) => response.json() )
            .then(res => {
              return res;
            })
          })
        } 
    ) 
  )