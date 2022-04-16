import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { find, map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AdminGuard } from './admin.guard';



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


  //Buscamos un Usuario mediante su UID y lo eliminamos de Firebase
  borrarUsuario( uidUsuario: string){
    this.firestore.doc(`usuarios/${uidUsuario}`).delete();
  }

  //Envíamos el email de reseteo de password al usuario
  resetPassword( email: string ){
    this.auth.sendPasswordResetEmail(email)
  }

}
