import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/global/home/home.component';
import { RegisterClientComponent } from './components/client/register-client/register-client.component';
import { ChangePasswordComponent } from './components/global/change-password/change-password.component';
import { ChangePasswordRequestComponent } from './components/global/change-password-request/change-password-request.component';

const routes: Routes = [
  {path: 'inicio', component: HomeComponent},
  {path: 'registro-cliente', component: RegisterClientComponent},
  { path: 'restablecer-password', component: ChangePasswordRequestComponent },
  { path: 'cambiar-password', component: ChangePasswordComponent },
  { path: 'perfil', loadChildren: () => import(`./components/client/client-detail/client-detail.module`).then(m => m.ClientDetailModule) },
  { path: 'panel-administrador', loadChildren : () => import(`./components/administrator/administrator.module`).then(m => m.AdministratorModule) },
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
