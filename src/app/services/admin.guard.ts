import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  canLoad(): Observable<boolean> {
    return of(false) /* this.authService.isAuth().pipe(
      tap((logado) => {
        if (logado) {
          if(this.authService.user.admin === false){
            this.router.navigate(['/cursos']);
          }
        }
      }),
      take(1)
    ); */

  } 




  
}
