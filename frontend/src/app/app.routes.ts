import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Medico } from './pages/medico/medico';
import { Paciente } from './pages/paciente/paciente';
import { Admin } from './pages/admin/admin';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: 'medico',
    component: Medico,
    canActivate: [authGuard],
    data: { roles: ['MEDICO'] },
  },
  {
    path: 'paciente',
    component: Paciente,
    canActivate: [authGuard],
    data: { roles: ['PACIENTE'] },
  },
  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard],
    data: { roles: ['ADMINISTRADOR'] },
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' },
];