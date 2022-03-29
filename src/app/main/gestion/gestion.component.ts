import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ListarUsuariosService } from 'src/app/services/listar-usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {




  public toggleListarCrear = false;
  public usuarios:Usuario[] = [];
  displayedColumns: string[] = ['UID', 'NOMBRE', 'EMAIL', 'ADMIN', 'GESTIÓN'];


  tiposGestion = [
    {
      gestion: 'listar',
      image: 'listUsuarios.png'
    },
    {
      gestion: 'crear',
      image: 'crearUsuario.png'
    }
  ];

  



  public crearUsuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)] ],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    admin: []
  });

  constructor(private fb: FormBuilder,private authService: AuthService, private listarUsuariosService:ListarUsuariosService) { }

  ngOnInit(): void {
    this.mostrar('listar');
  }

  mostrar(tipo: string){
    if(tipo !== 'listar'){
      this.toggleListarCrear = false;
    }else{
      this.listarUsuariosService.listarUsuarios().subscribe( usuarios => this.usuarios = usuarios)
      this.toggleListarCrear = true;
    }
  }

  crearUsuario(){
    if(this.crearUsuarioForm.invalid){return}


    let { nombre, email, password, admin } = this.crearUsuarioForm.value;
    //Revisamos si el usuario es admin
    admin === null ? admin = false : admin = true;

    this.authService.addUsuario(nombre, email, password, admin)
      .then( ok => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Añadido',
          text: 'Usuario creado con éxito.',
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message,
        });
      });

    this.crearUsuarioForm.reset()

  }

  editar(uid:string){
    console.log(uid)
  }
  borrar(uid:string){
    this.listarUsuariosService.borrarUsuario(uid)
  }

}
