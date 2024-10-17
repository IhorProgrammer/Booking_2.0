import path from "path";
import { MethodItemComponent } from "../../components/method-item/method-item.component";
import { Routes } from "@angular/router";

export class LinkInfo {
    public nameUrl: string;
    public url: string;
    public links?: LinkInfo[]; 
    public method: any;
    public isHideMethod: boolean;

    constructor( nameUrl:string, url:string, method: any, links?:LinkInfo[], isHideMethod?:boolean ) {
        this.nameUrl = nameUrl;
        this.url = url;
        this.method = method;
        this.links = links;
        this.isHideMethod = isHideMethod == undefined?false:isHideMethod;
    }

    public getRoutes(): any[] {
        const routes: any[] = [];

        // Add the current LinkInfo's route
        if (this.url) {
            if( this.method != undefined ) {
                routes.push({
                    path: this.url,
                    component: MethodItemComponent, // Assuming MethodItemComponent is defined elsewhere
                    data: {
                        data: () => this.method.then((x: any) => x.default)
                    }
                });
            }
        }

        // Recursively add routes for child links
        if (this.links) {
            for (const link of this.links) {
                routes.push(...link.getRoutes()); // Combine the routes from child links
            }
        }

        return routes;
    }
}