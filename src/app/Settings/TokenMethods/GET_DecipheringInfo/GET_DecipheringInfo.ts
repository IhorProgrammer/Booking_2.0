import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Дешифрування інформації [/decryption/{data}/{iv}]", 
      "GET",
      "Використовується для дешифрування повідомлень між серверами.",
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
    ) 
  )