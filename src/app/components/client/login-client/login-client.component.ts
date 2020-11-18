import { Component, OnInit } from '@angular/core';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

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
      null,
      null,
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
      this.loggedIn = user != null;
    });
  }

  signInWithFB(): void {
    Swal.fire('Espere un momento');
    Swal.showLoading();

    this._authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    this._authService.authState.subscribe((response) => {
      console.log(response);
      this.client = new Client(
        'id',
        response.firstName,
        response.lastName,
        'M',
        '1996',
        response.email,
        response.id,
        null,
        null,
        'ROLE_CLIENT'
      );

      this._clientService.register_login_fb_google(this.client).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.loading = false;
            this.token = response.token;
            this.identity = response.data;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            Swal.close();
          }
        },

        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Solucionando problemas ...',
            text: error.error.message,
          });
        }
      );
    });
  }

  signInWithGoogle(): void {
    Swal.fire('Espere un momento');
    Swal.showLoading();

    this._authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this._authService.authState.subscribe((response) => {
      console.log(response);
      this.client = new Client(
        'id',
        response.firstName,
        response.lastName,
        'M',
        '1996',
        response.email,
        response.id,
        null,
        null,
        'ROLE_CLIENT'
      );

      this._clientService.register_login_fb_google(this.client).subscribe(
        (response) => {
          if (response.status == 'success') {
            this.loading = false;

            this.token = response.token;
            this.identity = response.data;

            localStorage.setItem('token', this.token);
            localStorage.setItem('identity', JSON.stringify(this.identity));

            Swal.close();
          }
        },
        (error) => {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Solucionando problemas ...',
            text: error.error.message,
          });
        }
      );
    });
  }

  onSubmit() {
    Swal.fire('Espere un momento');
    Swal.showLoading();

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

          Swal.close();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.message,
          });
        }
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Solucionando problemas ...',
          text: error.error.message,
        });
      }
    );
  }
}
