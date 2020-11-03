import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { ClientDetailRoutingModule } from './client-detail-routing.module';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { ClientDetailComponent } from './client-detail.component';

@NgModule({
  declarations: [ClientEditComponent, ClientDetailComponent],
  imports: [
    CommonModule,
    ClientDetailRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [  
    MatDatepickerModule,  
  ]
})
export class ClientDetailModule { }
