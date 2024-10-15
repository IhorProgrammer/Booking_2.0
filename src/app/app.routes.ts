import { Routes } from '@angular/router';
import dataToPath from './Settings/path';



const filteredObject = Object.fromEntries(Object.entries(dataToPath));

let r: Routes = []; 

Object.keys(filteredObject).map( globalKey => { 
    const localArray = Object.fromEntries(Object.entries(filteredObject[globalKey]));
    const local = Object.keys(localArray).map( localKey => {
        return { 
            path: `${globalKey}${localKey == ""?"":"-"}${localKey}`, 
            loadComponent: () => import('./components/method-item/method-item.component').then(m => m.MethodItemComponent), 
            data: {
                data: () => localArray[localKey].then((x)=>  x.default)
            },
        } 
    })
    r = r.concat(local);
})




export const routes: Routes = r;



