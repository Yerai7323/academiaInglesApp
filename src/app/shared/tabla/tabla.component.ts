import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Curso } from 'src/app/models/cursos.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit, AfterViewInit {

  @Input() datosUsuarios!: Usuario[];
  @Input() datosCursos!: Curso[];
  @Input() columnas!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator; 
  @ViewChild(MatSort) sort!: MatSort;

  public dataSource!: MatTableDataSource<any>


  constructor() { }

  ngOnInit(): void {
    if(this.datosUsuarios.length > 0){
      this.dataSource = new MatTableDataSource(this.datosUsuarios);
    }else{
      this.dataSource = new MatTableDataSource(this.datosCursos);
    }

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editar(uid: string){

  }
  borrar(uid: string){

  }

  filtroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource!.filter = filterValue.trim().toLowerCase();
  }
}
