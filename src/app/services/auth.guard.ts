import { Injectable } from '@angular/core';
import { CanLoad, Router, } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService, 
    private router: Router
  ){}

  //Comprobamos si el usuario está logado antes de mostar los distintos componentes del Main
  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((logado) => {
        if (!logado) {
          this.router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
}
