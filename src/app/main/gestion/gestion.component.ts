import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from 'src/app/models/curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css'],
})
export class GestionComponent implements OnInit {

  //Gestionamos los distintos tipos de vistas que podemos tener en este componente,
  //dependiendo de que opción seleccione el usuario, temos las siguientes opciones:
  //LU -> listar usuarios
  //CU -> crear usuarios
  //LC -> listar cursos
  //CC -> crear cursos
  public gestionMostrar: 'LU' | 'CU' | 'LC' | 'CC' | null = null;
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


  public usuarios: Usuario[] = [];
  public cursos: Curso[] = []; 

  //Columnas tabla Usuarios
  columnasUsuarios: string[] = [
    'UID',
    'NOMBRE',
    'EMAIL',
    'ADMIN',
    'GESTIÓN',
  ];
  //Columnas tabla Curso
  columnasCursos: string[] = [
    'UID',
    'NOMBRE',
    'DURACIÓN',
    'PRECIO',
    'GESTIÓN',
  ];
  

  //Formulario creación Usuario
  public emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
  public crearUsuarioForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    admin: [],
  });

  //Formulario creación curso
  public precioPattern = "^[0-9]{1,3}$"
  public crearCursoForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    duracion: ['', [Validators.required]],
    precio: ['', [Validators.required, Validators.pattern(this.precioPattern)]],
    descripcion: ['', [Validators.required]],
  });


  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private cursosService: CursosService
  ) {}

  ngOnInit(): void {
    //Cargamos los usuarios
    this.usuariosService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
    //Cargamos los cursos
    this.cursosService.listarCursos().subscribe((cursos) => {
        this.cursos = cursos;
    }); 
  }

  //Método que determina que vamos a mostrar
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


  //Creación de usuario desde el Formulario
  crearUsuario() {
    if (this.crearUsuarioForm.invalid) {
      return;
    }

    let { nombre, email, password, admin } = this.crearUsuarioForm.value;
    //Revisamos si el usuario es admin
    admin === null ? (admin = false) : (admin = true);

    this.usuariosService
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

  //Creación de curso desde el formulario
  crearCurso() {
    let { nombre, duracion, precio, descripcion } = this.crearCursoForm.value;

    //Revisamos si el formulario se ha cumplimentado de forma correcta
    if (this.crearCursoForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Curso no añadido',
        text: 'Revisa los campos del formulario.',
        confirmButtonColor: '#3F51B5',
      });
      return;
    }
    
    this.cursosService
      .addCurso(nombre, duracion, precio, descripcion)
      .then((ok) => {
        Swal.fire({
          icon: 'success',
          title: 'Curso Añadido',
          text: 'Curso creado con éxito.',
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



  
}
