import { ConnectionName } from "../../Classes/AppSetting/Connection";
import { MethodFormClass } from "../../Classes/Method/MethodFormClass";
import { MethodInfoClass } from "../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../Classes/Method/ViewMethodClass";

export default new MethodInfoClass( 
  "Отримання всіх категорій [categories]", 
  "GET",
  "Використовується для отримання всіх категорій. Для отримання зображення потрібно перейти за categories/{url_зображення}",
  ConnectionName.Residence, 
  new MethodFormClass( 
    true,
    [ 
    ],
    function (connection, event) {
      return fetch(`${connection}/categories`, {
            method: 'GET',
            headers: {
            }
        }).then( (response) => response.json() )
        .then(res => {
          return res;
        })
    }
  ),
  [true, true, true],
  new ViewMethodClass("method-template/residence/categories/categories.html", "method-template/residence/categories/categories.css")
)
