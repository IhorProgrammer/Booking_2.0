import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Підписка користувача [/]", 
      "PUT",
      "Використовується для підписання користувача до токену, що був створений раніше. Підпис може бути тільки 1 на токен. Тобто для підписання одного й того ж користувача потрібно створити ще токен.",
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