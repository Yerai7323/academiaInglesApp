import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ListarUsuariosService {
  constructor(private firestore: AngularFirestore,private authService: AuthService) {}

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
    const uid = this.authService.user.uid;
    return this.firestore.doc(`usuarios/${uidUsuario}`).delete();
  }


}
