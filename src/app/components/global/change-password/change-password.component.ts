import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from '../../../services/client/client.service';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  providers: [ ClientService ]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  errors = null;

  constructor(
    public fb: FormBuilder,
    route: ActivatedRoute,
    public _clientService: ClientService,
  ) {
    this.changePasswordForm = this.fb.group({
      email: [''],
      password: [''],
      password_confirmation: [''],
      passwordToken: ['']
    })
    route.queryParams.subscribe((params) => {
      this.changePasswordForm.controls['passwordToken'].setValue(params['token']);
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){
    console.log(this.changePasswordForm.value);
    this._clientService.resetPassword(this.changePasswordForm.value).subscribe(
      result => {
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: 'Se a cambiado la contraseña exitosamente',
          text: 'Es un placer tenerte de vuelta',
        })

        this.changePasswordForm.reset();
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          text: 'Intentarlo de nuevo',
        })
      }
    );
  }


}