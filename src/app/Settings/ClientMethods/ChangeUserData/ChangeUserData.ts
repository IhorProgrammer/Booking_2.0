import AES from "../../../Classes/AES/AES";
import { ConnectionName } from "../../../Classes/AppSetting/Connection";
import { MethodFieldClass } from "../../../Classes/Method/MethodFieldClass";
import { MethodFormClass } from "../../../Classes/Method/MethodFormClass";
import { GetFormData, MethodInfoClass } from "../../../Classes/Method/MethodInfoClass";
import { ViewMethodClass } from "../../../Classes/Method/ViewMethodClass";

export default new MethodInfoClass( 
      "Зміна даних користувача", 
      "POST",
      "Зміна даних користувача використовує валідацію даних, про які буде невідомо, користувачу який буде реєструватись без підказок, тому завчасно потрібно подбати про те що валідація на стороні Frontend працювала. При успішній операції код (201). real_name - Не більше 32 символів, 1 літера з великою інші з маленької, без пробілів. nickname - Не більше 16 символів, 1 і більше латинська літера. email - Звичайна пошта за стандартами написання пройде валідацію example@gmail.com. phone - Потрібно писати номера починаючи з +, а також без пробілів і інших символів. birthday - 07.08.2024 or 07/08/2024. gender - False(0) - жіноча стать, True(1) - чоловіча стать. citizenship - назва міста проживання. password - більше 8 символів, хочаб велика або маленька літера, а також цифри.",
      ConnectionName.Client, 
      new MethodFormClass( 
        false,
        [ 
          new MethodFieldClass("avatar", "Аватар", "file", ""), 
          new MethodFieldClass("nickname", "Нікнейм (login)", "text", ""), 
          new MethodFieldClass("given_name", "Імя", "text", ""), 
          new MethodFieldClass("family_name", "Прізвище", "text", ""), 
          new MethodFieldClass("email", "Email", "email", ""), 
          new MethodFieldClass("phone", "Телефон", "tel", ""), 
          new MethodFieldClass("birthday", "Дата народження", "date", ""), 
          new MethodFieldClass("gender", "Ви чоловік?", "text", ""), 
          new MethodFieldClass("citizenship", "Місто проживання", "text", ""), 
          new MethodFieldClass("password", "Пароль", "password", ""), 
        ],
        function (connection, event) {
          //отримання  UserAgent
          const userAgent = navigator.userAgent; 
          // Отримуємо форму
          const form = event.target; 
          //_________________ВАЛІДАЦІЯ ДАНИХ______________________

          const formData = GetFormData(form)

          const userData = JSON.parse(localStorage.getItem('user_data') ?? "");
          formData.set("id", userData.id )
          formData.set("nickname", userData.nickname )

          formData.set("gender", form.elements['gender'].value == "M"? 'true' : 'false' )
          formData.append("user_agent", userAgent )
          //Отримання токену
          const token = localStorage.getItem('dc_auth_key');
          if( token == null ) {
              alert("User did not receive unique tokens")
              return;
          }

          return fetch( `${connection}/change`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData
          }).then( response => response.json() )
          .then( res => {
              if(res.meta.code === 200) {
                  localStorage.setItem("user_data", JSON.stringify(res.data));
              }
              return res;
          });
        } 
    ),
    [true, true, true],
    new ViewMethodClass("method-template/client/user_data/user_data.html","method-template/client/user_data/user_data.css")
  )