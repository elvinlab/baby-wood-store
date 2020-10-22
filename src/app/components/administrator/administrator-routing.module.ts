import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginAdministratorComponent } from './login-administrator/login-administrator.component';
import { AdministratorComponent } from './administrator.component';

const routes: Routes = [
  {
    path: '',
    component: AdministratorComponent,
    children: [
      { path: 'login', component: LoginAdministratorComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratorRoutingModule { }
