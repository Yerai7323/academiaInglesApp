import { Component, OnInit } from '@angular/core';
import { MetodoContacto } from 'src/app/models/metodoContacto.model';
import { MetodosContactoService } from 'src/app/services/metodos-contacto.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  public metodosContacto: MetodoContacto[] = [];

  constructor(private metodosContactoService: MetodosContactoService) { }

  ngOnInit(): void {

    //Realizamos la carga de los Valores al iniciar el componente
    this.metodosContactoService.listarMetodosContacto().subscribe( metodosContacto => {this.metodosContacto = metodosContacto; console.log(metodosContacto)} )

  }

}
