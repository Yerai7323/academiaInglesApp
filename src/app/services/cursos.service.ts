import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private firestore: AngularFirestore) {}

  //Método que devuelve un array de los Cursos de Firestore
  listarCursos(): Observable<Curso[]> {
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

  //Creamos un curso con todos sus campos, dejando el UID por defecto vacío, una vez creado el curso
  //rescatamos el UID autogenerado por Firebase y actualizamos su documento añadiendo dicho UID al objeto
  addCurso(
    nombre: string,
    duracion: string,
    precio: number,
    descripcion: string,
    uid: string = ''
  ) {
    const newCurso = new Curso(nombre, duracion, precio, descripcion, uid);
    return this.firestore.firestore
      .collection('cursos')
      .add({ ...newCurso })
      .then((fCurso) => {
        this.firestore.doc(`cursos/${fCurso.id}`).update({ uid: fCurso.id });
      });
  }

  //Buscamos un curso mediante su UID y lo eliminamos
  borrarCurso(uidCurso: string) {
    return this.firestore.doc(`cursos/${uidCurso}`).delete();
  }

  //Buscamos un Curso mediante su UID y devolvemos sus campos
  buscarCurso(uidCurso: string) {
    return this.firestore.doc<Curso>(`cursos/${uidCurso}`).valueChanges();
  }
}
