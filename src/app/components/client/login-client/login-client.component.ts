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
  loading = true;
  showModal: boolean;
  submitted = false;

  user: SocialUser;
  loggedIn: boolean;

  constructor(
    private _authService: SocialAuthService,
    private _clientService: ClientService
  ) {
    this.client = new Client(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      'ROLE_CLIENT'
    );
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
    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this._authService.authState.subscribe((response) => {
      document.getElementById('loading').style.display = 'block';
      console.log(response);
      this.client = new Client(
        'id',
        response.firstName,
        response.lastName,
        'M',
        '1996',
        response.email,
        response.id,
        'cel',
        'tel',
        'country',
        'province',
        'city',
        'postal_code',
        'street_address',
        'ROLE_CLIENT'
      );

      this._clientService.register(this.client).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.loading = false;
            this.token = response.token;
            this.identity = response.data;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            Swal.fire({
              icon: 'success',
              title: 'Hola',
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
            });

            document.getElementById('loading').style.display = 'none';
          }
        },

        (error) => {
          Swal.fire({
            icon: 'error',
            title: error.error.message,
            text: error.error.error,
          });
          document.getElementById('loading').style.display = 'none';
        }
      );
    });
  }

  signInWithGoogle(): void {
    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    this._authService.authState.subscribe((response) => {
      document.getElementById('loading').style.display = 'block';
      console.log(response);
      this.client = new Client(
        'id',
        response.firstName,
        response.lastName,
        'M',
        '1996',
        response.email,
        response.id,
        'cel',
        'tel',
        'country',
        'province',
        'city',
        'postal_code',
        'street_address',
        'ROLE_CLIENT'
      );

      this._clientService.register(this.client).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.loading = false;

            this.token = response.token;
            this.identity = response.data;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            Swal.fire({
              icon: 'success',
              title: 'Hola',
              text: response.message,
              showConfirmButton: false,
              timer: 1500,
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
          localStorage.setItem('identity', JSON.stringify(this.identity));

          if (this.submitted) {
            this.showModal = false;
          }

          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Bienvenido de nuevo',
            showConfirmButton: false,
            timer: 1500,
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
