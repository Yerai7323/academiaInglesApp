import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Curso } from '../models/cursos.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private firestore: AngularFirestore) { }


  listarCursos():Observable<Curso[]>{
    return this.firestore
      .collection<Curso>(`cursos`)
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

  borrarCurso( uidCurso: string){
    return this.firestore.doc(`cursos/${uidCurso}`).delete();
  }
}
