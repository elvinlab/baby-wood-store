import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../models/client';
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register-client',
  templateUrl: './register-client.component.html',
  styleUrls: ['./register-client.component.css'],
  providers: [ClientService]
})
export class RegisterClientComponent implements OnInit {

  public client: Client;

  constructor(
    private _clientService: ClientService,
    private _router: Router,
  ){
    this.client = new Client("", "", "", "",  "", "ROLE_CLIENT", "", "", "");
  }

  ngOnInit() {
  }

  onSubmit(form){
    
    this._clientService.register(this.client).subscribe(
      response => {

        if(response.status == 'success'){

          form.reset();

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido nuestra familia Baby Wood',
            text: 'Es un placer que te quedes con nosotros',
            
          })

          this._router.navigate(['inicio']);

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
