import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientDetailComponent } from './client-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ClientDetailComponent,
    children: [
      { path: 'editar-perfil', component: ClientEditComponent },
      { path: '', redirectTo: 'editar-perfil', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDetailRoutingModule {}
