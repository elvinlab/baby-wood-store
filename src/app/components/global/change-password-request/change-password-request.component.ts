import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from '../../../services/client/client.service';

@Component({
  selector: 'app-change-password-request',
  templateUrl: './change-password-request.component.html',
  styleUrls: ['./change-password-request.component.css'],
  providers: [ ClientService ]
})
export class ChangePasswordRequestComponent implements OnInit {

  resetForm: FormGroup;
  errors = null;
  successMsg = null;

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
        this.successMsg = result;
      },(error) => {
        this.errors = error.error.message;
      })
  }

}