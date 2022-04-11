export class Curso {

    static fromFirebase( firebaseCurso:any ){
        return new Curso(firebaseCurso.nombre, firebaseCurso.duracion, firebaseCurso.precio, firebaseCurso.uid, firebaseCurso.descripcion)
    }

    constructor(
        public nombre: string,
        public duracion: string,
        public precio: number,
        public descripcion:string,
        public uid?: string,
    ){}

}