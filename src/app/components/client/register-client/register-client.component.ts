import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SocialAuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
  providers: [ClientService, SocialAuthService],
})
export class RegisterClientComponent implements OnInit {
  public client: Client;
  public token: any;
  public identity: any;
  loading = true;
  constructor(
    private _authService: SocialAuthService,
    private _clientService: ClientService,
    private _router: Router
  ) {
    this.client = new Client(
      'id',
      '',
      '',
      'M',
      '1996',
      '',
      '',
      'cel',
      'tel',
      'country',
      'province',
      'city',
      'postal_code',
      'street_address',
      'ROLE_CLIENT'
    );
  }

  ngOnInit() {}

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
        'cel',
        'tel',
        'country',
        'province',
        'city',
        'postal_code',
        'street_address',
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

            this._router.navigate(['inicio']);
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
        'cel',
        'tel',
        'country',
        'province',
        'city',
        'postal_code',
        'street_address',
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
            this._router.navigate(['inicio']);
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

  onSubmit(ngForm) {

    Swal.fire('Espere un momento');
    Swal.showLoading();

    this._clientService.register(this.client).subscribe(
      (response) => {

        console.log(response);
        if (response.status == 'success') {
          ngForm.reset();
          this.token = response.token;
          this.identity = response.data;
          localStorage.setItem('token', this.token);
          localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.close();
          this._router.navigate(['inicio']);
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
