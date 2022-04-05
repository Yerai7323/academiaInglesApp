import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user!:Usuario;


  constructor(
    private router: Router,
    private authService: AuthService,
    private firestore: AngularFirestore,
  ) { }

  ngOnInit(): void {
    
    this.authService.isAdmin().subscribe(fuser => {
      if (fuser) {
        this.firestore
        .doc(`usuarios/${fuser.uid}`)
        .valueChanges()
        .subscribe( user=> {
          const usuario = Usuario.fromFirebase(user)
          this.user = usuario;
        })
      }
    })

  }

  logout(){
    this.authService.logOut();
    this.router.navigate(['/login']);
  }


}
