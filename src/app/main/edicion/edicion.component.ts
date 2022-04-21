import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-edicion',
  templateUrl: './edicion.component.html',
  styleUrls: ['./edicion.component.css']
})
export class EdicionComponent implements OnInit {


  public editarCursoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
  });

  public editarUsuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: [{value: '', disabled: true}],
    admin: [],
  });

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



  actualizarCurso(){

    const newNombre = this.editarCursoForm.get('nombre')?.value;
    const newDuracion = this.editarCursoForm.get('duracion')?.value;
    const newPrecio = this.editarCursoForm.get('precio')?.value;
    const newDescripcion = this.editarCursoForm.get('descripcion')?.value;
    if(
      newNombre === this.curso?.nombre && 
      newDuracion === this.curso?.duracion && 
      newPrecio === this.curso?.precio && 
      newDescripcion === this.curso?.descripcion 
    ){
      console.log('no se ha modificado')

    }else{
      this.cursosService.editarCurso(this.curso?.uid!, newNombre, newDuracion, newPrecio, newDescripcion)
    }
  }

  eliminarCurso(){
    this.cursosService.borrarCurso(this.curso?.uid!);
    this.router.navigate(['/gestion']);
  }

  actualizarUsuario(){
    const newNombre = this.editarUsuarioForm.get('nombre')?.value;
    const isAdmin = this.editarUsuarioForm.get('admin')?.value;

    if(newNombre === this.usuario?.nombre && 
      isAdmin === this.usuario?.admin  ){

        console.log('no se ha modificado')

    }else{
      this.usuariosService.editarUsuario(this.usuario?.uid!, newNombre, isAdmin)
    }

  }

  resetContrasenia(){
    this.usuariosService.resetPassword(this.usuario?.email!);
  }

  eliminarUsuario(){

    
    this.usuariosService.borrarUsuario(this.usuario?.uid!);


    this.router.navigate(['/gestion']);

  }


}
