import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClienteProfileComponent } from './components/cliente-profile/cliente-profile.component';

export const routes: Routes = [
  {
    path: '' ,
    component: HomeComponent,
  },
  {
    path: 'clientes/:id',
    component: ClienteProfileComponent,

  }
];
