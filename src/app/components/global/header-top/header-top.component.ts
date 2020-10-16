import { Component, OnInit, DoCheck } from '@angular/core';
import { ClientService } from '../../../services/client/client.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.css'],
  providers: [ClientService],
})
export class HeaderTopComponent implements OnInit, DoCheck {
  public identity: any;
  public token: string;

  constructor(private _clientService: ClientService) {
    this.loadAccount();
  }

  ngOnInit(): void {}

  ngDoCheck() {
    this.loadAccount();
  }

  loadAccount() {
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('token');
  }

  signOut(): void {
    this._clientService.logout(this.token).subscribe(
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Nos vemos pronto',
        showConfirmButton: false,
        timer: 2000,
      })
    );

    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this.identity = null;
    this.token = null;
  }
}
