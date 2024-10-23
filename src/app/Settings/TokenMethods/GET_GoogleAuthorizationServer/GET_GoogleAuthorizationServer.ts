import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Авторизація Google [/google/code]", 
      "GET",
      "Використовується для авторизації через гугл сервіс на стороні серверу за правилами OAuth 2.0",
      ConnectionName.Token, 
      new MethodFormClass( 
        false,
        [ 
        ],
        function (connection, event) {
          return  new Promise((resolve, reject) => {
            resolve("Не має коду, використовується між серверами");
          })
        } 
      ),
      [] 
  )