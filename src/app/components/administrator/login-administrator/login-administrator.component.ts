import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Administrator } from '../../../models/administrator';
import { AdministratorService } from '../../../services/administrator/administrator.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login-administrator',
  templateUrl: './login-administrator.component.html',
  styleUrls: ['./login-administrator.component.css'],
  providers: [ AdministratorService ]
})
export class LoginAdministratorComponent implements OnInit {
  
  public administrator: Administrator;
	public token: any;
	public identity: any;
  
  showModal: boolean;
  submitted = false;

  constructor(
    
    private _administratorService: AdministratorService,

    ) { 
      this.administrator = new Administrator("", "", "", "",  "","");
    }
  
  show(){ this.showModal = true }

  hide(){ this.showModal = false }

  ngOnInit() {
  
  }

  onSubmit() {

    this.submitted = true;
  
    this._administratorService.login(this.administrator).subscribe(

        response => {

          if(response.status === 'success'){

            this.token = response.token;
            this.identity = response.administrator;

            localStorage.setItem('token_administrator', this.token);
            localStorage.setItem('identity_administrator', JSON.stringify(this.identity));

            if(this.submitted){ this.showModal = false  }

              Swal.fire({
                position: 'top',
                icon: 'success',
                title: 'Bienvenido de nuevo',
                showConfirmButton: false,
                timer: 1500,
              })
      
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: response.message,
            })

          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: error.error.error,
          })
        }
    );
  }
}