import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutComponent } from './aut/aut.component';
import { AuthToken } from './services/auth-token';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    children: [
      {
        path: '',
        loadChildren: './home/home.module#HomeModule'
      }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    canActivate: [AuthToken],
    component: AutComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
