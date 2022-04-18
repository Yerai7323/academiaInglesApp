import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/models/profesor.model';
import { Valor } from 'src/app/models/valor.model';
import { ProfesoresService } from 'src/app/services/profesores.service';
import { ValoresService } from 'src/app/services/valores.service';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.css']
})
export class ConocenosComponent implements OnInit {

  public valores: Valor[] = [];
  public profesores: Profesor[] = [];

  constructor(private valoresService: ValoresService, private profesoresService: ProfesoresService) { }

  ngOnInit(): void {

    //Realizamos la carga de los valores y profesores al iniciar el componente
    this.valoresService.listarValores().subscribe( valores => {this.valores = valores} )
    this.profesoresService.listarProfesores().subscribe( profesores => {this.profesores = profesores} )
  }

}
