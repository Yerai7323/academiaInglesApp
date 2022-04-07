import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/cursos.model';
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

    this.cursosService.listarCursos().subscribe( cursos => {this.cursos = cursos; console.log(cursos)})

    
  }


  mostrarCurso(nombre: string){
    console.log(nombre)
  }

}
