import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { ListarUsuariosService } from './listar-usuarios.service';

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


  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  //Para comprobar en auth.guard.ts si estamos logados
  isAuth() {
    return this.auth.authState.pipe(map((fUser) => fUser != null));
  }

  logOut() {
    return this.auth.signOut();
  }

  addUsuario(nombre: string, email: string, password: string, admin: boolean) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((fUser) => {
        const newUser = new Usuario(fUser.user?.uid!, nombre, email, admin);
        console.log('newUser', newUser);
        this.firestore.doc(`usuarios/${fUser.user?.uid}`).set({ ...newUser });
      });
  }

  initAuthListener() {
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
  }

  
}
