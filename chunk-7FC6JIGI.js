var f=Object.defineProperty,v=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var o=Object.getOwnPropertySymbols;var g=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable;var i=(t,r,e)=>r in t?f(t,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[r]=e,b=(t,r)=>{for(var e in r||={})g.call(r,e)&&i(t,e,r[e]);if(o)for(var e of o(r))h.call(r,e)&&i(t,e,r[e]);return t},k=(t,r)=>v(t,O(r));var x=(t,r)=>{var e={};for(var s in t)g.call(t,s)&&r.indexOf(s)<0&&(e[s]=t[s]);if(t!=null&&o)for(var s of o(t))r.indexOf(s)<0&&h.call(t,s)&&(e[s]=t[s]);return e};var y=(t,r,e)=>new Promise((s,c)=>{var u=a=>{try{l(e.next(a))}catch(n){c(n)}},S=a=>{try{l(e.throw(a))}catch(n){c(n)}},l=a=>a.done?s(a.value):Promise.resolve(a.value).then(u,S);l((e=e.apply(t,r)).next())});var E={ClientServer:"http://localhost:5082",TokenServer:"http://localhost:5083",ResidenceServer:"http://localhost:5254"},m={data:"\u041A\u043E\u0440\u0438\u0441\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F, \u044F\u043A\u0430 \u0437\u043C\u0456\u043D\u044E\u0454\u0442\u044C\u0441\u044F \u043A\u043E\u0436\u043D\u0438\u043C \u0437\u0430\u043F\u0438\u0442\u043E\u043C",meta:{created:"\u0434\u0430\u0442\u0430 \u0456 \u0447\u0430\u0441 \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0446\u044C\u043E\u0433\u043E \u0437\u0430\u043F\u0438\u0442\u0443",message:"\u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u044F, \u044F\u043A\u0435 \u043D\u0435\u0441\u0435 \u0432 \u0441\u043E\u0431\u0456 \u043A\u043E\u0440\u0438\u0441\u043D\u0443 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044E \u043F\u0440\u043E \u043F\u043E\u043C\u0438\u043B\u043A\u0443",code:"\u0447\u0438\u0441\u043B\u043E, \u044F\u043A\u0435 \u043F\u043E\u0437\u043D\u0430\u0447\u0430\u0454 \u0441\u0442\u0430\u0442\u0443\u0441 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u0438 (200 - OK, 404 - Error \u0456 \u0442\u0434.)"}};var p=class{static get Get(){return JSON.stringify(m,null,2)}};export{b as a,k as b,x as c,y as d,E as e,p as f};