import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';




@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private firestore: AngularFirestore, private auth: AngularFireAuth) {}

  //Método que devuelve un array de los Usuarios de Firestore
  listarUsuarios():Observable<Usuario[]>{
    return this.firestore
      .collection<Usuario>(`usuarios`)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.map((doc) => {
            const data = doc.payload.doc.data();
            return data;
          });
        })
      );
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
        this.resetPassword(email);
      });
  }

  //Buscamos un Curso mediante su UID y devolvemos sus campos
  buscarUsuario(uidUsuario: string) {
    return this.firestore.doc<Usuario>(`usuarios/${uidUsuario}`).valueChanges();
  }

  //Buscamos un Usuario mediante su UID y lo eliminamos de Firebase
  borrarUsuario( uidUsuario: string){
    this.firestore.doc(`usuarios/${uidUsuario}`).delete();
  }

  //Envíamos el email de reseteo de password al usuario
  resetPassword( email: string ){
    this.auth.sendPasswordResetEmail(email);
  }

  //Edicion de un usuario
  editarUsuario(uid: string, nombre: string, admin:boolean ) {
    this.firestore.doc(`usuarios/${uid}`).update({nombre, admin});
  }


    

}
