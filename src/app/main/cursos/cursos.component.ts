import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso.model';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cursos:Curso[] = [];

  constructor(private cursosService:CursosService) { }

  ngOnInit(): void {

    //Realizamos la carga de cursos al iniciar el componente
    this.cursosService.listarCursos().subscribe( cursos => {this.cursos = cursos} )
  }


}
