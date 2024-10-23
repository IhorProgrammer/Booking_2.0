import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Видалення сессії [/session/{clientId}]", 
      "DELETE",
      "Використовується для видалення сесій, що підєднані до даного користувача",
      ConnectionName.Token, 
      new MethodFormClass( 
        true,
        [ 
          new MethodFieldClass("token_id", "ID TOKEN", "text")
        ],
        function (connection, event) {
          //отримання  UserAgent
          const userAgent = navigator.userAgent; 
          //отримання id токену
          const form = event.target; // Отримуємо форму
          const tokenId = form.elements['token_id'].value;

          //підготовка даних до шифровання
          const data = { "data": { "token_id": tokenId }, "user_agent": userAgent };

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
                method: 'DELETE',
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
      ),
      [true, false, true] 
  )