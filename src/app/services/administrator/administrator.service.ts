import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AdministratorService {

    public baseUrl: string;
    public identity: any;
    public token: any;

    constructor(
      public http: HttpClient
    ) {
      this.baseUrl = environment.baseUrl;
    }

    register(client: any): Observable<any>{
        const json = JSON.stringify(client);
        const params = `json=${ json }`;

        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.baseUrl + 'store/administrator/register', params, { headers });
    }

    login(client: any, token = null): Observable<any>{

      if (token != null){
        client.token = 'true';
      }

      const json = JSON.stringify(client);
      const params = `json=${ json }`;

      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

      return this.http.post(this.baseUrl + 'store/administrator/login', params, { headers });
    }
}
