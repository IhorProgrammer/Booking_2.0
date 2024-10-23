import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Генерація токенів", 
      "POST",
      "Використовується для отримання токену, що потім ідентифікує користувача в сисетемі і надає право доступа до тої чи іншої інформації. А також в добавок отримується salt, що використовуэться для шифрування повыдомлень мыж сервером і користувачем.",
      ConnectionName.Token, 
      new MethodFormClass( 
        false,
        [ 
           
        ],
        function (connection, event) {
          const userAgent = navigator.userAgent; 
          const url = `${connection}`;

          const formData = new FormData();
          formData.append("user_agent", userAgent )


          return fetch(url, {
            method: 'POST',
            headers: {},
            body: formData
          }).then( response => response.json() )
          .then( res => {
            if(res.meta.code === 201) {
              localStorage.setItem('dc_auth_key', res.data.token);
              localStorage.setItem('dc_server_salt', res.data.salt);
            }
              return res;
          });
        } 
      ), 
      [true, false, true] 
  )