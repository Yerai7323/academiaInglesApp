import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CursosComponent } from './cursos/cursos.component';
import { TestsComponent } from './tests/tests.component';
import { ConocenosComponent } from './conocenos/conocenos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { GestionComponent } from './gestion/gestion.component';
import { AdminGuard } from '../services/admin.guard';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'cursos',
        component: CursosComponent
      },
      {
        path: 'cursos/:uid',
        component: DetallesComponent
      },
      {
        path: 'test',
        component: TestsComponent
      },
      {
        path: 'conocenos',
        component: ConocenosComponent
      },
      {
        path: 'contacto',
        component: ContactoComponent
      },
      {
        path: 'gestion',
        canLoad: [AdminGuard],
        component: GestionComponent
      },
      {
        path: '**',
        redirectTo: 'cursos'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports:[RouterModule]
})
export class MainRoutingModule { }
