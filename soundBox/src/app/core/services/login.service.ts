import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { configHttpService } from './config-http.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private configHttpService: configHttpService
  ) {}

  login(value: any): Observable<any> {
    const body = JSON.stringify(value);

    return this.httpClient
      .post(
        'http://ec2-54-85-110-77.compute-1.amazonaws.com:8080/api/authenticate',
        body,
        this.configHttpService.httpOptions()
      )
      .pipe(catchError(this.configHttpService.handleError));
  }

  getUser(value: any): Observable<any> {
    const body = JSON.stringify(value);

    return this.httpClient
      .post(
        'http://ec2-54-85-110-77.compute-1.amazonaws.com:8080/api/user/get',
        body,
        this.configHttpService.httpOptions()
      )
      .pipe(catchError(this.configHttpService.handleError));
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUser(id: string) {
    localStorage.setItem('idUser', id);
  }

  getIdUser() {
    //localStorage.setItem('idUser', '1');
    return localStorage.getItem('idUser');
  }
}
