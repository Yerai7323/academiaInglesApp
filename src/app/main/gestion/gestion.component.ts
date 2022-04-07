import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/cursos.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {
  public gestionMostrar: 'LU' | 'CU' | 'LC' | 'CC' | null = null;
  public usuarios: Usuario[] = [];
  public cursos: Curso[] = []; 

  columnasUsuarios: string[] = [
    'UID',
    'NOMBRE',
    'EMAIL',
    'ADMIN',
    'GESTIÓN',
  ];
  columnasCursos: string[] = [
    'UID',
    'NOMBRE',
    'DURACIÓN',
    'PRECIO',
    'GESTIÓN',
  ];
  tiposGestion = [
    {
      gestion: 'listar usuarios',
      image: 'listUsuarios.png',
    },
    {
      gestion: 'crear usuarios',
      image: 'crearUsuario.png',
    },
    {
      gestion: 'listar cursos',
      image: 'listCursos.png',
    },
    {
      gestion: 'crear cursos',
      image: 'crearCurso.png',
    },
  ];

  public crearUsuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    admin: [],
  });

  public crearCursoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: ['', [Validators.required]],
    precio: ['', [Validators.required]],
  });


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usuariosService: UsuariosService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
    this.cursosService.listarCursos().subscribe((cursos) => {
        this.cursos = cursos;
    }); 
  }

  mostrar(tipo: string) {
    switch (tipo) {
      case 'listar usuarios':
        this.gestionMostrar = 'LU';
        break;
      case 'crear usuarios':
        this.gestionMostrar = 'CU';
        break;
      case 'listar cursos':
        this.gestionMostrar = 'LC';
        break;
      case 'crear cursos':
        this.gestionMostrar = 'CC';
        break;
      default:
        this.gestionMostrar = 'LU';
    }
  }


  crearUsuario() {
    if (this.crearUsuarioForm.invalid) {
      return;
    }

    let { nombre, email, password, admin } = this.crearUsuarioForm.value;
    //Revisamos si el usuario es admin
    admin === null ? (admin = false) : (admin = true);

    this.authService
      .addUsuario(nombre, email, password, admin)
      .then((ok) => {
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

    this.crearUsuarioForm.reset();
  }

  crearCurso() {
    if (this.crearCursoForm.invalid) {
      return;
    }
    let { nombre, duracion, precio } = this.crearCursoForm.value;
    this.authService
      .addCurso(nombre, duracion, precio)
      .then((ok) => {
        Swal.fire({
          icon: 'success',
          title: 'Curso Añadido',
          text: 'Cursocreado con éxito.',
          confirmButtonColor: '#3F51B5',
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: err.message,
        });
      });

    this.crearCursoForm.reset();
  }

  editar(uid: string) {
    console.log(uid);
  }

  
}
