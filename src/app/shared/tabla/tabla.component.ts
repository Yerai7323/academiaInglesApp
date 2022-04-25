import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/curso.model';
import { Usuario } from 'src/app/models/usuario.model';
import { CursosService } from 'src/app/services/cursos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit, AfterViewInit {

  //Datos obtenidos mediante los Inputs (obtenemos los datos del componente padre)
  @Input() datosUsuarios!: Usuario[];
  @Input() datosCursos!: Curso[];
  @Input() columnas!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource!: MatTableDataSource<any>

  constructor(private cursosService:CursosService, private usuariosService:UsuariosService, private router: Router) { }

  ngOnInit(): void {
    //Se revisa que input contiene los datos para saber si tenemos que mostar
    //la tabla de cursos o la de usuarios.
    if(this.datosUsuarios.length > 0){
      this.dataSource = new MatTableDataSource(this.datosUsuarios);
    }else{
      this.dataSource = new MatTableDataSource(this.datosCursos);
    }
  }

  ngAfterViewInit() {
    //Una vez hemos cargado la tabla le añadimos el paginado y los filtros de ordenación
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Nos redirige a la edición del usuario seleccionado.
  editarUsuario(uid: string){
    this.router.navigate(['/edicion/usuario', uid]);
  }

  //Nos redirige a la edición del curso seleccionado.
  editarCurso(uid: string){
    this.router.navigate(['/edicion/curso', uid]);
  }

  //Filtrado de datos de la tabla mediante el buscador
  filtroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }


  //Eliminación de usuario con confirmación
  borrarUsuario(uid: string) {
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
        this.usuariosService.borrarUsuario(uid);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'El usuario fue eliminado',
          confirmButtonColor: '#3F51B5',
        });
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.datosUsuarios);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },500); 
      }
    });
  }

  //Eliminación de usuario con confirmación
  borrarCurso(uid: string) {
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
        this.cursosService.borrarCurso(uid);
        Swal.fire({
          icon: 'success',
          title: 'Eliminado!',
          text: 'El curso fue eliminado.',
          confirmButtonColor: '#3F51B5',
        });
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.datosCursos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },500); 
      }
    });
  }
  
}
