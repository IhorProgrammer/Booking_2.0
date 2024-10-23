import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../../Classes/Method/ViewMethodClass";

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

          if (!window.confirm("Do you whant GoogleAuth?")) {
            const url = window.location.href;
            const urlParams = new URLSearchParams(new URL(url).search);

            const res = {
                id: urlParams.get('id'),
                avatar: urlParams.get('avatar'),
                given_name: urlParams.get('given_name'),
                family_name: urlParams.get('family_name'),
                nickname: urlParams.get('nickname'),
                email: urlParams.get('email'),
                phone: urlParams.get('phone'),
                birthday: urlParams.get('birthday'),
                gender: urlParams.get('gender'),
                citizenship: urlParams.get('citizenship'),
            }

            localStorage.setItem("user_data", JSON.stringify(res));

            return  new Promise((resolve, reject) => {
              resolve(res);
            })
          }


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
          return null;
        } 
    ),
    [true, true, true],
    new ViewMethodClass("method-template/token/google_auth.html", "") 
  )