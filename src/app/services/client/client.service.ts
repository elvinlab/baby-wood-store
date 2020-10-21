import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ClientService {
  public baseUrl: string;
  public identity: any;
  public token: any;

  constructor(public http: HttpClient) {
    this.baseUrl = environment.baseUrl;
  }

  register(client: any): Observable<any> {
    const json = JSON.stringify(client);
    const params = `json=${json}`;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(this.baseUrl + 'store/client/register', params, {
      headers,
    });
  }

  register_login_fb_google(client: any): Observable<any> {
    const json = JSON.stringify(client);
    const params = `json=${json}`;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(
      this.baseUrl + 'store/client/register-fb-google',
      params,
      { headers }
    );
  }

  update(token, client: any): Observable<any> {
    const json = JSON.stringify(client);
    const params = `json=${json}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(this.baseUrl + 'store/client/update', params, {
      headers,
    });
  }

  login(client: any, token = null): Observable<any> {
    if (token != null) {
      client.token = 'true';
    }

    const json = JSON.stringify(client);
    const params = `json=${json}`;

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    return this.http.post(this.baseUrl + 'store/client/login', params, {
      headers,
    });
  }

  sendResetPasswordLink(data: any) {
    return this.http.post(
      'http://127.0.0.1:8000/api/store/client/reset-password-request',
      data
    );
  }

  resetPassword(data: any) {
    return this.http.post(
      'http://127.0.0.1:8000/api/store/client/change-password',
      data
    );
  }

  logout(token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.baseUrl + 'store/client/logout', {
      headers: headers,
    });
  }
}
