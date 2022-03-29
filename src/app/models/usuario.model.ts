
export class Usuario {

    static fromFirebase( firebaseUser:any ){
        return new Usuario(firebaseUser.uid, firebaseUser.nombre, firebaseUser.email, firebaseUser.admin)
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
        public admin: boolean,
    ){}

}