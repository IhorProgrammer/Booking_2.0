import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MethodResolver implements Resolve<any> {
  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if(typeof window !== 'undefined') {
        const isDevOps = localStorage.getItem('DevOps') === 'true';
        const isHideMethod = route.data['isHideMethod']; // Отримуємо isHideMethod через квадратні дужки
        // Перевірка доступу
        if (isHideMethod && !isDevOps) {
          // Якщо isHideMethod = true і DevOps = false, перенаправляємо на іншу сторінку
          this.router.navigate(['/']); // Змінюйте на ваш маршрут
          return of(null); // Повертаємо null, щоб не завантажувати компонент
        }
    }
    return of(true); // Якщо доступ дозволено, повертаємо true
  }
}
