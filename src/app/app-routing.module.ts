import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/global/home/home.component';
import { LoginAdministratorComponent } from './components/administrator/login-administrator/login-administrator.component';
import { RegisterClientComponent } from './components/client/register-client/register-client.component';
import { ChangePasswordComponent } from './components/global/change-password/change-password.component';
import { ChangePasswordRequestComponent } from './components/global/change-password-request/change-password-request.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'registro-cliente', component: RegisterClientComponent},
  { path: 'restablecer-password', component: ChangePasswordRequestComponent },
  { path: 'cambiar-password', component: ChangePasswordComponent },
  {path: 'administrador', component: LoginAdministratorComponent},
  { path: 'perfil', loadChildren: () => import(`./components/client/client-detail/client-detail.module`).then(m => m.ClientDetailModule) },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
