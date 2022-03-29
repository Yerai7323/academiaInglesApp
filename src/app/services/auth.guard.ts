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

  canLoad(): Observable<boolean> {
    return this.authService.isAuth().pipe(
      tap((logado) => {
        if (!logado) {
          this.router.navigate(['/login']);
          console.log(logado)
        }
      }),
      take(1)
    );
  }
}
