export class Curso {

    static fromFirebase( firebaseUser:any ){
        return new Curso(firebaseUser.nombre, firebaseUser.duracion, firebaseUser.precio)
    }

    constructor(
        public nombre: string,
        public duracion: string,
        public precio: number,
    ){}

}