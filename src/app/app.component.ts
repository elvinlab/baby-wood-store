import { Component, OnInit, DoCheck } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

  public identity: any;
  public token: string;
  title: string;
  constructor(
    
  ) {
    this.title = 'Baby Wood Tienda';
    this.loadAccount();
   }

  ngOnInit(): void {
  }

  ngDoCheck(){
    this.loadAccount();
  }

  loadAccount(){
    this.identity = JSON.parse(localStorage.getItem('identity'));
    this.token = localStorage.getItem('token');
  }

  //tienda->promociones->
  //nuevos servicio_>convenio_empresarial->disenno de muebles y espacios->consultoria forestal
  //cotizacion
}