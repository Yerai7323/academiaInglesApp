import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user:string = '';
  userSubs!: Subscription;

  admin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    

    //Pendiente de cambiar a subscripción
    setTimeout(() => {
      this.admin = this.authService.user.admin!;
      this.user = this.authService.user.nombre!;
    },1000);

  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }


}
