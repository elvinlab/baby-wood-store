import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-middle',
  templateUrl: './header-middle.component.html',
  styleUrls: ['./header-middle.component.css']
})
export class HeaderMiddleComponent implements OnInit {

  constructor(
    private _router: Router,
  ) {

   }

  ngOnInit(): void {
  }

  goProducts(): void {

    this._router.navigate(['registro-cliente']); // Ir a la vista de productos
  }

}
