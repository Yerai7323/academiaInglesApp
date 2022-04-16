import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Curso } from '../models/cursos.model';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private firestore: AngularFirestore) { }

  //Método que devuelve un array de los Cursos de Firestore
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

  //Buscamos un curso mediante su UID y lo eliminamos
  borrarCurso( uidCurso: string){
    return this.firestore.doc(`cursos/${uidCurso}`).delete();
  }

  //Buscamos un Curso mediante su UID y devolvemos sus campos
  buscarCurso(uidCurso:string){
    return this.firestore.doc<Curso>(`cursos/${uidCurso}`).valueChanges();
  }
}
 