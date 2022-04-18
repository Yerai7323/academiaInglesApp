import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Valor } from '../models/valor.model';

@Injectable({
  providedIn: 'root'
})
export class ValoresService {

  constructor(private firestore: AngularFirestore) { }

  //Método que devuelve un array de los Cursos de Firestore
  listarValores(): Observable<Valor[]> {
    return this.firestore
      .collection<Valor>(`valores`)
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
