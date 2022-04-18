import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Curso } from 'src/app/models/curso.model';
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

    //Cogemos el UID del curso a través de la ruta en la que nos encontramos
    //Una vez tenemos el UID buscamos nuestro curso por ese UID y cargamos el contenido
    this.activatedroute.params.pipe(
      switchMap( ({uid}) => this.cursosService.buscarCurso(uid) )
    ).subscribe( curso => {
      if(curso){
        this.curso = curso;
        this.descripcion = curso.descripcion.split('/');
      }
    })

  }

}
