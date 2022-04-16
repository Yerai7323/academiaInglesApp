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

  borrarUsuario( uidUsuario: string){
    this.firestore.doc(`usuarios/${uidUsuario}`).delete();
  }

  resetPassword( email: string ){
    this.auth.sendPasswordResetEmail(email)
  }

}
