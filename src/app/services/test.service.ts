import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Test } from '../models/test.model';


@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private firestore: AngularFirestore) { }
  
    //Método que devuelve un array de los Cursos de Firestore
    listarTest(): Observable<Test[]> {
      return this.firestore
        .collection<Test>(`test`)
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






