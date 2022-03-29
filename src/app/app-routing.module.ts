import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [

  {path: 'login', 
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: '',
    canLoad: [AuthGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {path: '**', redirectTo: 'login'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
