import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private firestore: AngularFirestore) {}

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
    return this.firestore.doc(`usuarios/${uidUsuario}`).delete();
  }


}
