import { Routes } from '@angular/router';
import * as dataToPath from './Settings/path.json';
import UserAuthorization from './Settings/ClientMethods/UserAuthorization/UserAuthorization';


const filteredObject = Object.fromEntries(
    Object.entries(dataToPath).filter(([key]) => key !== 'default')
);
const keys = Object.keys(filteredObject);

let r: Routes = []; 
keys.map( global => { 
    const local = Object.keys(filteredObject[global]).map( local => {
        return { 
            path: `${global}/${local}`, 
            loadComponent: () => import('./components/method-item/method-item.component').then(m => m.MethodItemComponent), 
            data: {
                data: UserAuthorization
            },
        } 
    })
    r = r.concat(local);
})


export const routes: Routes = r;
