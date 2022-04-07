export class Curso {

    static fromFirebase( firebaseUser:any ){
        return new Curso(firebaseUser.nombre, firebaseUser.duracion, firebaseUser.precio, firebaseUser.uid,)
    }

    constructor(
        public nombre: string,
        public duracion: string,
        public precio: number,
        public uid?: string
    ){}

}