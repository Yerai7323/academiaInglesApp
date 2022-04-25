import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {


  //Formulario para la edición de los cursos
  public editarCursoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  //Formulario para la edición de los usuarios
  public editarUsuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: [{value: '', disabled: true}],
    admin: [],
  });

  //Inicializamos las variables donde guardaremos que tipo de edicion es, es decir, si
  //es un curso o un usuario y por otro lado dependiendo el tipo cargaremos dicho
  //curso o usuario directamente en el formulario de edición correspondiente
  tipoEdicion: 'usuario'| 'curso' | null = null ;
  curso:Curso | null = null
  usuario:Usuario | null = null


  constructor(
    private router: Router, 
    private activatedroute: ActivatedRoute, 
    private cursosService:CursosService, 
    private usuariosService:UsuariosService, 
    private fb: FormBuilder
  ){}


  ngOnInit(): void {

    //Leemos la URL en la que nos encontramos, dependiendo de si contiene 'usuario' o 'curso'
    //significará que estamos editando un usuario o curso, para ello cargaremos el formulario correspondiente
    //luego con el UID obtendremos el usuario o curso a editar y con el pathValue cargaremos los datos del usuario o curso
    //en su formulario.
    const url = this.router.url;

    if( url.includes('usuario') ){
      this.tipoEdicion = 'usuario'
      this.activatedroute.params.pipe(
        switchMap( ({uid}) => this.usuariosService.buscarUsuario(uid) )
      ).subscribe( usuario => {
        if(usuario){
          this.usuario = usuario;
          console.log(this.usuario)
          this.editarUsuarioForm.patchValue(this.usuario)
        }
      });
    }else{
      this.tipoEdicion = 'curso'
      this.activatedroute.params.pipe(
        switchMap( ({uid}) => this.cursosService.buscarCurso(uid) )
      ).subscribe( curso => {
        if(curso){
          this.curso = curso;
          this.editarCursoForm.patchValue(this.curso)
        }
      });
    }


  }


  //Método para la actualización de un curso
  actualizarCurso(){

    //Cogemos los datos actuales del curso
    const newNombre = this.editarCursoForm.get('nombre')?.value;
    const newDuracion = this.editarCursoForm.get('duracion')?.value;
    const newPrecio = this.editarCursoForm.get('precio')?.value;
    const newDescripcion = this.editarCursoForm.get('descripcion')?.value;

    //Si intentamos modificar, primero comprobamos que realmente haya habido cambios en el curso
    //en caso de que no haya cambios nos saltará un mensaje indicandonoslo, en cambio, si realmente 
    //se ha modificado algun contenido del curso no saltará un mensaje indicando que se ha modificado con éxito
    //y se actualizarán los datos de dicho curso 
    if(
      newNombre === this.curso?.nombre && 
      newDuracion === this.curso?.duracion && 
      newPrecio === this.curso?.precio && 
      
      newDescripcion === this.curso?.descripcion 
    ){
      Swal.fire({
        icon: 'info',
        title: 'Curso no editado',
        text: 'El curso no se ha modificado.',
        confirmButtonColor: '#3F51B5',
      });

    }else{

      Swal.fire({
        icon: 'success',
        title: 'Curso modificado con éxito',
        text: 'El curso se ha modificado.',
        confirmButtonColor: '#3F51B5',
      });
      this.cursosService.editarCurso(this.curso?.uid!, newNombre, newDuracion, newPrecio, newDescripcion)
    }
  }

  //Método para la eliminación de un curso, para evitar eliminaciones involuntaria de cursos
  //se solicitará una confirmación del borrado antes de ejecutarse.
  eliminarCurso(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se borrará el curso',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar curso',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursosService.borrarCurso(this.curso?.uid!);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'El curso fue eliminado con éxito',
          confirmButtonColor: '#3F51B5',
        });
        this.router.navigate(['/gestion']); 
      }
    });
  }

  //Método que nos permite actualizar los datos de los usuarios.
  actualizarUsuario(){

    //Si intentamos modificar, primero comprobamos que realmente haya habido cambios en el usuario
    //en caso de que no haya cambios nos saltará un mensaje indicandonoslo, en cambio, si realmente 
    //se ha modificado algun contenido del usuario no saltará un mensaje indicando que se ha modificado con éxito
    //y se actualizarán los datos de dicho usuario 
    const newNombre = this.editarUsuarioForm.get('nombre')?.value;
    const isAdmin = this.editarUsuarioForm.get('admin')?.value;

    if(
      newNombre === this.usuario?.nombre && 
      isAdmin === this.usuario?.admin  
    ){
      Swal.fire({
        icon: 'info',
        title: 'Usuario no editado',
        text: 'El usuario no se ha modificado.',
        confirmButtonColor: '#3F51B5',
      });

    }else{

      Swal.fire({
        icon: 'success',
        title: 'Curso modificado con éxito',
        text: 'El curso se ha modificado.',
        confirmButtonColor: '#3F51B5',
      });
      this.usuariosService.editarUsuario(this.usuario?.uid!, newNombre, isAdmin)
    }

  }

  //Método para el reset de la contraseña de un usuario a través de un mail
  resetContrasenia(){
    this.usuariosService.resetPassword(this.usuario?.email!);
  }

  //Método para la eliminación de un usuario, para evitar eliminaciones involuntaria de usuarios
  //se solicitará una confirmación del borrado antes de ejecutarse.
  eliminarUsuario(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se borrará el usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar usuario',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuariosService.borrarUsuario(this.usuario?.uid!);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'El usuario fue eliminado con éxito',
          confirmButtonColor: '#3F51B5',
        });
        this.router.navigate(['/gestion']); 
      }
    });
  }

}
