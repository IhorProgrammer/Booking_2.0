import { urlencoded } from "express";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { GetFormData, MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../../Classes/Method/ViewMethodClass";

export default new MethodInfoClass( 
      "Отримання зображення (аватарки) користувача", 
      "GET",
      "Використовується для отримання зображення користувачів",
      ConnectionName.Client, 
      new MethodFormClass( 
        false,
        [
          new MethodFieldClass("avatar", "Avatar_URL", "text", userData()), 
        ],
        function (connection, event) {  
          const formHTML = event.target; 
          const formData = GetFormData(formHTML)
          return  new Promise((resolve, reject) => {
            resolve(`${connection}/image/${encodeURIComponent(formData.get("avatar") as string)}`);
          })
        } 
      ),
      [false, true, false],
      new ViewMethodClass("method-template/client/image/image.html", "")
)

function userData(): string {
  if(typeof localStorage !== 'undefined'){
    if(localStorage.getItem('user_data') == null) return "";
    const js = JSON.parse(localStorage.getItem('user_data') ?? "");
    if( js != null ) return js["avatar"]
  }
  return ""
} 