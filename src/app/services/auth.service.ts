import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs';
import { map } from 'rxjs';
import { Curso } from '../models/cursos.model';
import { Usuario } from '../models/usuario.model';
import { UsuariosService } from './usuarios.service';

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
    private usuariosService: UsuariosService
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

  //Creamos el usuario con los campos nombre, email, password y admin, tras esta creación
  //obtenemos el UID autogenerado por Firebase y creamos un objeto Usuario con dichos campos
  //una vez creado el objeto, se inserta el Firestore con su UID
  addUsuario(nombre: string, email: string, password: string, admin: boolean) {
    return this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((fUser) => {
        const newUser = new Usuario(fUser.user?.uid!, nombre, email, admin);
        this.firestore.doc(`usuarios/${fUser.user?.uid}`).set({ ...newUser });
      });
  }

  //Creamos un curso con todos sus campos, dejando el UID por defecto vacío, una vez creado el curso
  //rescatamos el UID autogenerado por Firebase y actualizamos su documento añadiendo dicho UID al objeto
  addCurso(nombre: string, duracion: string, precio: number, descripcion: string, uid: string = '') {
    const newCurso = new Curso(nombre, duracion, precio, descripcion, uid);
    return this.firestore.firestore
      .collection('cursos')
      .add({ ...newCurso })
      .then((fCurso) => {
        this.firestore.doc(`cursos/${fCurso.id}`).update({ uid: fCurso.id });
      });
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
