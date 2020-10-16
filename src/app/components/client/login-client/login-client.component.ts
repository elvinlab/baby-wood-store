import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css'],
  providers: [ClientService, SocialAuthService],
})
export class LoginClientComponent implements OnInit {
  public client: Client;
  public token: any;
  public identity: any;
  showModal: boolean;
  submitted = false;

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private _authService: SocialAuthService,
    private _clientService: ClientService
  ) {
    this.client = new Client('', '', '', '', '', '', '', '', '');
  }

  show() {
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  ngOnInit() {
    this._authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  signInWithFB(): void {
    this.submitted = true;

    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this._authService.authState.subscribe((response) => {
      console.log(response);

      if (this.submitted) {
        this.showModal = false;
      }

      this.client = new Client(
        '',
        response.firstName,
        'registerFacebook',
        response.email,
        response.id,
        '',
        'registerFacebook',
        'registerFacebook',
        'registerFacebook'
      );

      this._clientService.register(this.client).subscribe(
        (response) => {
          console.log(response);
          if (response.status == 'success') {
            this.token = response.token;
            this.identity = response.data;

            localStorage.setItem('token', this.token);
            localStorage.setItem(
              'identity',
              JSON.stringify(this.identity)
            );

            Swal.fire({
              icon: 'success',
              title: 'Hola',
              text: response.message,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        },

        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: error.error.error,
          });
        }
      );
    });
  }

  signInWithGoogle(): void {
    this.submitted = true;

    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this._authService.authState.subscribe((response) => {
      console.log(response);

      if (this.submitted) {
        this.showModal = false;
      }

      this.client = new Client(
        '',
        response.firstName,
        'registerGoogle',
        response.email,
        response.id,
        '',
        'registerGoogle',
        'registerGoogle',
        'registerGoogle'
      );

      this._clientService.register(this.client).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.token = response.token;
            this.identity = response.data;

            localStorage.setItem('token', this.token);
            localStorage.setItem(
              'identity',
              JSON.stringify(this.identity)
            );

            Swal.fire({
              icon: 'success',
              title: 'Hola',
              text: response.message,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: error.error.error,
          });
        }
      );
    });
  }

  onSubmit() {
    this.submitted = true;

    this._clientService.login(this.client).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.token = response.token;
          this.identity = response.client;

          localStorage.setItem('token', this.token);
          localStorage.setItem(
            'identity',
            JSON.stringify(this.identity)
          );

          if (this.submitted) {
            this.showModal = false;
          }

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Bienvenido de nuevo',
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message,
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: error.error.message,
          text: error.error.error,
        });
      }
    );
  }
}
