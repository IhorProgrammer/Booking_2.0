import { ConnectionName } from "../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../Classes/Method/MethodFormClass";
import { GetFormData, MethodInfoClass } from "../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../Classes/Method/ViewMethodClass";

export default new MethodInfoClass( 
  "Пошук готелів", 
  "GET",
  "Використовується для пошуку, апартаментів. Існує декілька параметрів (search, id_category, max_people, price_order, popularity_order, result_count, offset_value). search - шукає за назвою і адресою готелю. category - пошук за id категорії. people - йде пошук за кількості людей в апартаменті(квартирі) і виводить готель. price_order - сортування за ціною, 1 - за зростанням, -1 - за спаданням (не поєднувати з popularity_order). popularity_order - відсортовує за популярністю апартаментів. count - кількість готелів, що виводе за раз. offset - номер сторінки, яка включає в себе result_count(кількість готелів).",
  ConnectionName.Residence, 
  new MethodFormClass( 
    true,
    [ 
      new MethodFieldClass("search", "Пошук", "text", ""), 
      new MethodFieldClass("category", "Category", "number", ""), 
      new MethodFieldClass("people", "К-ть людей", "number", ""), 
      new MethodFieldClass("price_order", "Сорт. ціною", "number", "0"), 
      new MethodFieldClass("popularity_order", "Сорт. популярністю", "number", ""), 
      new MethodFieldClass("count", "К-ть відповідей", "number", ""), 
      new MethodFieldClass("offset", "Сорітнка", "number", ""), 

    ],
    function (connection, event) {
      const formHTML = event.target; 
      const formData = GetFormData(formHTML)
      const queryStringArray: string[] = [];

      const popularity_order = formData.get("popularity_order");
      formData.set("popularity_order",  (popularity_order == "1").toString() )

      formData.forEach((value, key) => {
        console.log(key, value, value == "");
        if(value != null && value != '' ) {
          queryStringArray.push(`${encodeURIComponent(key)}=${encodeURIComponent( value.toString() )}`);
        }
      });

      return fetch(`${connection}?${queryStringArray.join("&")}`, {
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
  new ViewMethodClass("method-template/residence/hotels/hotels.html", "method-template/residence/hotels/hotels.css")
)
