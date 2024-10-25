import { ConnectionName } from "../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../Classes/Method/MethodFormClass";
import { GetFormData, MethodInfoClass } from "../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../Classes/Method/ViewMethodClass";

export default new MethodInfoClass( 
  "Отримання інформації про готель", 
  "GET",
  "Використовується для отримання повної інформації про готель за його id",
  ConnectionName.Residence, 
  new MethodFormClass( 
    true,
    [ 
      new MethodFieldClass("id", "№id", "number", ""), 
    ],
    function (connection, event) {
      const formHTML = event.target; 
      const formData = GetFormData(formHTML)

      return fetch(`${connection}/residence-info/${formData.get("id")}`, {
            method: 'GET',
            headers: {}
        }).then( (response) => response.json() )
        .then(res => {
          return res;
        })
    }
  ),
  [true, true, true],
  new ViewMethodClass("method-template/residence/hotel-info/hotel-info.html", "method-template/residence/hotel-info/hotel-info.css")
)