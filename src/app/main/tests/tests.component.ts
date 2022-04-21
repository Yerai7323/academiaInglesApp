import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {


  respuestasCorrectas: number = 0;


  preguntasForm = new FormGroup({
    pregunta0: new FormControl('', Validators.required),
    pregunta1: new FormControl('', Validators.required),

 }); 

  preguntas: any = [
    {
      pregunta: '¿de que color es el caballo blanco?',
      respuestas: ['rojo','verde','blanco'],
      soluciones: ['incorrecta1','incorrecta2','correcta']
    },
    {
      pregunta: '¿1+1?',
      respuestas: ['1','2','3'],
      soluciones: ['incorrecta1','correcta','incorrecta2']
    }


  ]

  constructor() { }

  ngOnInit(): void {

  }


  comprobarForm(){
    const respuestas = this.preguntasForm.value;
    let correctas = 0;
    for( const respuesta in respuestas ){
      if (respuestas[respuesta] === 'correcta'){
        correctas++
      } 
      
    }
    //console.log(correctas)
    this.respuestasCorrectas = correctas;
    //console.log(this.respuestasCorrectas)
  }

}
