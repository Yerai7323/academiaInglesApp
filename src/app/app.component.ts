import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private authService: AuthService){
    //Al cargar la aplicación vamos a realizar un logOut de forma que siempre 
    //se tenga que pasar por el login, para evitar problemas de seguridad
    this.authService.logOut();
    this.authService.initAuthListener(); 
  }
}
