import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';
import { TestsComponent } from './tests/tests.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { GestionComponent } from './gestion/gestion.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TablaComponent } from '../shared/tabla/tabla.component';




@NgModule({
  declarations: [HomeComponent, CursosComponent, TestsComponent, ConocenosComponent, ContactoComponent, GestionComponent, TablaComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ]
})
export class MainModule { }
