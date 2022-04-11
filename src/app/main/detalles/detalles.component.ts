import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Curso } from 'src/app/models/cursos.model';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

  curso!: Curso;
  descripcion: string[] = [];


  constructor(private activatedroute: ActivatedRoute, private cursosService:CursosService) { }

  ngOnInit(): void {

    this.activatedroute.params
    .pipe(
      switchMap( ({uid}) => this.cursosService.buscarCurso(uid) )
    )
    .subscribe( curso => {
      if(curso){
        this.curso = curso;
        this.descripcion = curso.descripcion.split('/');
      }
    })

  }

}
