import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutComponent } from './aut/aut.component';
import { AuthGuard } from './services/auth.guard';

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
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    component: AutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
