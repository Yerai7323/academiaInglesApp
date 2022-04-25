import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/test.model';
import { TestService } from 'src/app/services/test.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {

  test: Test[] = []
  respuestasCorrectas: number = 0;
  totalPreguntas: number = 0;
  preguntaActual: number = 0; 
  testFinalizado = false;
  nivelIngles:string = '';
  


  //Generamos los FormControl para nuestro test y indicamos que tienen que ser
  //obligatoriamente contestados con el Validators.required
  preguntasForm = new FormGroup({
    pregunta1: new FormControl('', Validators.required),
    pregunta2: new FormControl('', Validators.required),
    pregunta3: new FormControl('', Validators.required),
    pregunta4: new FormControl('', Validators.required),
    pregunta5: new FormControl('', Validators.required),
    pregunta6: new FormControl('', Validators.required),
    pregunta7: new FormControl('', Validators.required),
    pregunta8: new FormControl('', Validators.required),
    pregunta9: new FormControl('', Validators.required),
    pregunta10: new FormControl('', Validators.required),
    pregunta11: new FormControl('', Validators.required),
    pregunta12: new FormControl('', Validators.required),
    pregunta13: new FormControl('', Validators.required),
    pregunta14: new FormControl('', Validators.required),
    pregunta15: new FormControl('', Validators.required)
 }); 

  

  constructor( private testService:TestService ) { }


  ngOnInit(): void {

    //Cargamos nuestra lista de preguntas
    this.testService.listarTest().subscribe( test => {
      this.test = test; 
      this.totalPreguntas = test.length;
    });
    
  }

  //avanzamos entre preguntas
  siguiente(){
    this.preguntaActual++
  }

  //retrocedemos entre preguntas
  anterior(){
    this.preguntaActual--
  }

  //Método que revisa el formulario, vamos recorriendo todas los tests
  //por cada test cogemos las respuesta y si coincide con la que hemos seleccionado 
  //incrementamos la variable de correctas, una vez revisadas todos los test, actualizamos
  //this.respuestasCorrectas con el número de aciertos totales
  //tras calcular el numero de respuestas correctas llamamos al método calcularNivel() que nos va
  //a asignar un nivel de inglés pedendiendo del numero de respuestas correctas y actualizamos "testFinalizado"
  //para que se actualice la vista y nos muestre la vista del resultado del test.
  comprobarForm(){
    const tests = this.preguntasForm.value;
    let correctas = 0;
    for( const respuesta in tests ){
      if (tests[respuesta] === 'correcta'){
        correctas++
      } 
    }
    this.respuestasCorrectas = correctas;
    this.calcularNivel();
    this.testFinalizado = true;
  }

  //Método que calcula el nivel de inglés dependiendo de las respuestas acertadas
  calcularNivel(){
    switch (this.respuestasCorrectas) {
      case 3:
        this.nivelIngles = 'A1'
        break;
      case 5:
        this.nivelIngles = 'A2'
        break;
      case 8:
        this.nivelIngles = 'B1'
        break;
      case 12:
        this.nivelIngles = 'B1'
        break;
      case 15:
        this.nivelIngles = 'C1'
        break;
      default:
        this.nivelIngles = 'A1'
    }

  }

  
}
