import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";

export default new MethodInfoClass( 
      "Отримання зображення (аватарки) користувача", 
      "GET",
      "Використовується для отримання зображення користувачів",
      ConnectionName.Client, 
      new MethodFormClass( 
        false,
        [ ],
        function (connection, event) {          
          const userData = JSON.parse(localStorage.getItem('user_data') ?? "");
          const avatar = encodeURIComponent(userData["avatar"])
          return fetch( `${connection}/image/${avatar}`, {
            method: 'GET',
            headers: {},
          }).then( response => response );
        } 
    ) 
  )