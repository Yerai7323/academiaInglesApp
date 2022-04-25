import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}


  //Protección de ruta "/gestion", en caso de no ser admin lo redirigimos a "/cursos"
  canActivate(): boolean {
    if(!this.authService.user.admin){
      this.router.navigate(['/cursos']);
      return false
    }
    return true
  } 
}
