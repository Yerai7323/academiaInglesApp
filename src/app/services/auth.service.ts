import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs';
import { map } from 'rxjs';
import { Curso } from '../models/cursos.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private _user: Usuario | null = null;

  get user() {
    return { ...this._user };
  }

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) {}

  //Método que recibe los datos del formulario de logado (emial / password)
  //y nos loga en la aplicación si los datos son correctos.
  loginUsuario(email: string, password: string){
   return this.auth.signInWithEmailAndPassword(email, password);
  }

  //Para comprobar en auth.guard.ts si estamos logados
  isAuth() {
    return this.auth.authState.pipe(map((fUser) => fUser != null));
  }

  //Método que devuelve los datos del usuario logado, con el take(1)
  //le inidicamos que tras recibir esos datos el subscribe deje de emiter valores
  //para evitar recibir dichos datos repetidas veces
  isAdmin() {
    return this.auth.authState.pipe(take(1));
  }

  //Método para deslogarnos de la aplicación
  logOut() {
    return this.auth.signOut();
  }


  /* initAuthListener() {
    this.auth.authState.subscribe((fuser) => {
      if (fuser) {
        this.firestore
          .doc(`usuarios/${fuser.uid}`)
          .valueChanges()
          .subscribe((firestoreUser) => {
            const user = Usuario.fromFirebase(firestoreUser);
            this._user = user;
          });
      } else {
        this._user = null;
      }
    });
  } */
}




/*

EDICION CURSO/USUARIO
TEST

RESET PASSWORD AL CREAR USUARIO??

*/