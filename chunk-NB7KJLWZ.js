import{a,b as r,c as i}from"./chunk-MNULFMEI.js";import"./chunk-7FC6JIGI.js";var _=new i("\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u044F Google [/google/{userAgent}]","GET","\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0456\u0457 \u0447\u0435\u0440\u0435\u0437 \u0433\u0443\u0433\u043B \u0441\u0435\u0440\u0432\u0456\u0441",1,new a(!1,[],function(m,d){if(!window.confirm("Do you whant GoogleAuth?")){let t=window.location.href,e=new URLSearchParams(new URL(t).search),o={data:{id:e.get("id"),avatar:encodeURIComponent(e.get("avatar")??""),given_name:e.get("given_name"),family_name:e.get("family_name"),nickname:e.get("nickname"),email:e.get("email"),phone:e.get("phone"),birthday:e.get("birthday"),gender:e.get("gender"),citizenship:e.get("citizenship")}};return localStorage.setItem("user_data",JSON.stringify(o)),new Promise((c,g)=>{c(o)})}let n=localStorage.getItem("dc_auth_key");if(n==null){alert("\u041A\u043E\u0440\u0438\u0441\u0442\u0443\u0432\u0430\u0447 \u043D\u0435 \u043E\u0442\u0440\u0438\u043C\u0430\u0432 \u0443\u043D\u0456\u043A\u0430\u043B\u044C\u043D\u0456 \u0442\u043E\u043A\u0435\u043D\u0438");return}let l=navigator.userAgent,s=`${m}/google/${encodeURIComponent(l)}`;return fetch(s,{method:"GET",headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"}}).then(t=>t.json()).then(t=>(t.meta.code===200&&(window.location.href=t.data),t)),null}),[!0,!0,!0],new r("method-template/client/user_data/user_data.html","method-template/client/user_data/user_data.css"));export{_ as default};
