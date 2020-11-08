import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {

  public identity: any;
  public token: string;

  constructor() {
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

}
