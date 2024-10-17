import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Авторизація Google [/google/{userAgent}]", 
      "GET",
      "Використовується для авторизації через гугл сервіс",
      ConnectionName.Token, 
      new MethodFormClass( 
        false,
        [ 
        ],
        function (connection, event) {
          //Отримання токену
          const token = localStorage.getItem('dc_auth_key');
          if( token == null ) {
              alert("Користувач не отримав унікальні токени")
              return;
          }

          const userAgent = navigator.userAgent; 
          const url = `${connection}/google/${encodeURIComponent(userAgent)}`;
          fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
          }).then(response => response.json())
          .then( res => {
            if(res.meta.code === 200) {
              window.location.href = res.data;
            }
            return res;
          });
        } 
    ) 
  )