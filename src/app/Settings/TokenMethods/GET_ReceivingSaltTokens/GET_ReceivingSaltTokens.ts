import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Отримання salt токену [/{userAgent}]", 
      "GET",
      "Використовується для перевірки на те що токен вже пройшов авторизацію і отримання salt, що використовуэться для шифрування, дешифрування між клієнтом і сервером.",
      ConnectionName.Token, 
      new MethodFormClass( 
        false, 
        [ ],
        function (connection, event) {
          return  new Promise((resolve, reject) => {
            resolve("Не має коду, використовується між серверами");
          })
        } 
      ),
      [false, false, false]
  )