import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
  providers: [ClientService],
})
export class RegisterClientComponent implements OnInit {
  public client: Client;
  public token: any;
  public identity: any;
  constructor(private _clientService: ClientService, private _router: Router) {
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
  onSubmit(form) {
   
    this._clientService.register(this.client).subscribe(
      (response) => {
        if (response.status == 'success') {
          form.reset();
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
