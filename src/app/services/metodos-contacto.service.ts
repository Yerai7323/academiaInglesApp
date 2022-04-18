import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { MetodoContacto } from '../models/metodoContacto.model';

@Injectable({
  providedIn: 'root'
})
export class MetodosContactoService {

  constructor(private firestore: AngularFirestore) { }

  //Método que devuelve un array de los Cursos de Firestore
  listarMetodosContacto(): Observable<MetodoContacto[]> {
    return this.firestore
      .collection<MetodoContacto>(`contacto`)
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
