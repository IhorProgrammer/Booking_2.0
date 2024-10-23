import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkInfo } from '../../Classes/ILinkInfo/LinkInfo';
import paths from '../../appSettings';
import { link } from 'fs';


class NavMenu {
  public routes?: NavMenu[]; 
  public isHideMethod: boolean = false;
  public nameUrl!: string;
  public url!: string;
  private _next?: NavMenu;

  private angleShag: number = 5;
  private startAngle: number = 0;

  private urlActiveIndex: boolean = false;

  constructor(url: string, nameUrl: string, routes?: NavMenu[], fullRoutes: boolean = false) {
    this.url = url;
    this.nameUrl = nameUrl;
    this.routes = routes;

    if( this.routes != undefined ) {
      this.startAngle = (this.routes.length - 1) * this.angleShag / -2;
    }
  }

  public get UrlActive(): boolean {
    return this.urlActiveIndex;  
  }

  public Next(index: number): NavMenu {
    if( this.routes != undefined ) {
      this.routes.forEach( x => x.urlActiveIndex = false );
      this.routes[index].urlActiveIndex = true;
      if( this.routes[index].routes != undefined ) {
        this.routes[index]._next = this;
        return this.routes[index];
      }
    }

    return this; 
  }

  public Prev(): NavMenu {
    if( this.routes != undefined  )
      this.routes.forEach( x => x.urlActiveIndex = false );

    if( this._next != undefined ) {
      return this._next;
    }
    return this;
  }

  public Angle(index: number): number {
    return this.startAngle + index * this.angleShag; 
  }


  public findRoutePath(url: string): number[] | undefined {
    if (this.url === url) {
      return [];
    }

    if (this.routes) {
      for (let i = 0; i < this.routes.length; i++) {
        const childRoute = this.routes[i];
        const result = childRoute.findRoutePath(url);

        if (result !== undefined) {
          return [i, ...result]; 
        }
      }
    }

    return undefined; 
  }


  public static ByLinkInfo(value: LinkInfo): NavMenu {
    let links = value.links;
    if(typeof window !== 'undefined') {
      const isDevOps = localStorage.getItem('DevOps') === 'true';
      if(!isDevOps)
        links = links?.filter(link => !link.isHideMethod)
    }
    const routes: NavMenu[] | undefined = links?.map(link => NavMenu.ByLinkInfo(link));
    return new NavMenu(value.url, value.nameUrl, routes);
  }
}


// const navTest: NavMenu = new NavMenu(
//   "", 
//   "Головна", 
//   [
//     new NavMenu("client", "Client_API", [
//       new NavMenu("client-authorization", "Авторизація"),
//       new NavMenu("client-registration", "Реєстрація")
//     ]),
//     new NavMenu("token", "Token_API", [
//       new NavMenu("token-authorization", "Авторизація"),
//       new NavMenu("token-registration", "Реєстрація")
//     ]),
//   ]
// );



@Component({
  selector: 'bkng-left-ui-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './left-ui-navigation.component.html',
  styleUrl: './left-ui-navigation.component.scss'
})
export class LeftUiNavigationComponent implements OnInit  {

  constructor() {}

  public NavsMenu!: NavMenu;
  public get CurrentPathname() {
    if (typeof window !== "undefined") {
      return window.location.pathname.substring(1);
    }
    return "";
  }

  ngOnInit(): void {
    this.SetNavMenu();
  }

  public NextLink(index: number) { this.NavsMenu = this.NavsMenu.Next(index); }
  public PrevLink() { this.NavsMenu = this.NavsMenu.Prev(); }
  public StartMenu() {
    this.NavsMenu = this.NavsMenu.Prev();
  }

  public get getMediumCircleAngles() {
    return this.ArrayShag( 35, [0,1,2,3,4] );
  }

  public UpdatePage() {
    window.location.reload();
  }
  
  public HideShowMethod() {
    if(typeof window === 'undefined') return;
    const isDevOps = localStorage.getItem('DevOps') === 'true';
    if(isDevOps) localStorage.setItem("DevOps", 'false');
    else localStorage.setItem("DevOps", 'true');
    this.SetNavMenu();
  };
  public get isDevOps() {
    if(typeof window !== 'undefined')
      return localStorage.getItem('DevOps') === 'true'
    return false;
  }

  public MenuShow = signal("close");
  public ToggleMenu() {
    if( this.MenuShow() == "open" )
      this.MenuShow.set("close");
    else 
      this.MenuShow.set("open");
  }

  private SetNavMenu(){
    this.NavsMenu = NavMenu.ByLinkInfo( paths );
    const path = this.NavsMenu.findRoutePath(this.CurrentPathname);
    if( path != undefined ) {
      path.forEach( (index) => {
        this.NavsMenu = this.NavsMenu.Next(index);
      })
    }

  }

  private ArrayShag(angleShag: number, arrData: any[]) {
    const filterArr = arrData.filter(x => x != "default" && x != "end");
    const startAngle = (filterArr.length - 1) * angleShag / -2;
    const arr = filterArr.map( (data, index) => {
      return { data: data, angle: startAngle + index * angleShag }
    })
    return arr;
  }
}
