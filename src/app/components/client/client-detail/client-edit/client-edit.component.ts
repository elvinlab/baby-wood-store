import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../../models/client';
import { ClientService } from '../../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css'],
  providers: [ClientService],
})
export class ClientEditComponent implements OnInit {
  public client: Client;
  public token: any;
  public identity: any;
  constructor(private _clientService: ClientService, private _router: Router) {

    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('token');

    this.client = new Client(
      this.identity.id,
      this.identity.name,
      this.identity.surname,
      'M',
      //this.identity.gender,
      '1996',
     // this.identity.birth_year,
      this.identity.email,
      this.identity.password,
      this.identity.cel,
      this.identity.tel,
      this.identity.country,
      this.identity.province,
      this.identity.city,
      this.identity.postal_code,
      this.identity.street_address,
      this.identity.role,
    );
  }

  ngOnInit(): void {}

  onSubmit() {
    this._clientService.update(this.token, this.client).subscribe(
      (response) => {
        if (response.status == 'success') {
          console.log(response);

          if (response.data.name) {
            this.client.name = response.data.name;
          }

          if (response.data.surname) {
            this.client.surname = response.data.surname;
          }

          if (response.data.gender) {
            this.client.gender = response.data.gender;
          }

          /*        
          if(response.data.birth_year){
						this.client.birth_year = response.data.birth_year;
          }
          */

          if (response.data.email) {
            this.client.email = response.data.email;
          }

          if (response.data.cel) {
            this.client.cel = response.data.cel;
          }

          if (response.data.tel) {
            this.client.tel = response.data.tel;
          }

          if (response.data.country) {
            this.client.country = response.data.country;
          }

          if (response.data.province) {
            this.client.province = response.data.province;
          }

          if (response.data.city) {
            this.client.city = response.data.city;
          }

          if (response.data.postal_code) {
            this.client.postal_code = response.data.city;
          }

          if (response.data.street_address) {
            this.client.street_address = response.data.street_address;
          }

          this.identity = this.client;
          localStorage.setItem('identity', JSON.stringify(this.identity));

          Swal.fire({
            icon: 'success',
            title: 'todo fue un exito',
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
  }
}
