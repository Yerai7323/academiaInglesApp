import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Profesor } from '../models/profesor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private firestore: AngularFirestore) { }

  //Método que devuelve un array de los Cursos de Firestore
  listarProfesores(): Observable<Profesor[]> {
    return this.firestore
      .collection<Profesor>(`profesores`)
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
}
