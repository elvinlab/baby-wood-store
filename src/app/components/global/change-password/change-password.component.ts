import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientService } from '../../../services/client/client.service';
import { throwError } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
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
      password: ['admin123'],
      password_confirmation: ['admin123'],
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
        alert('Password has been updated');
        this.changePasswordForm.reset();
      },
      error => {
        this.handleError(error);
      }
    );
  }

  handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }

}