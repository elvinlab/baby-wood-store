import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-change-password-request',
  templateUrl: './change-password-request.component.html',
  styleUrls: ['./change-password-request.component.css'],
  providers: [ ClientService, FormBuilder, FormGroup, Validators ]
})
export class ChangePasswordRequestComponent implements OnInit {

  resetForm: FormGroup;
 
  constructor(
    public fb: FormBuilder,
    private _clientService: ClientService,
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  ngOnInit(): void { }

  onSubmit(){
    this._clientService.sendResetPasswordLink(this.resetForm.value).subscribe(
      (result) => {
        console.log(result);
        Swal.fire({
          icon: 'success',
          title:'Se a enviado un link de restablecimiento a su correo',
          text: 'Revisar correo',
        })

      },(error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          text: 'Intentarlo de nuevo',
        })
      })
  }
}