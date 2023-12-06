import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractService } from '@services';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authReq?: HttpRequest<any>;

  constructor(
    private router: Router,
    private abstractService: AbstractService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    const token = localStorage.getItem('token')
      ? localStorage.getItem('token')
      : '';

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    if (token != '') {
      this.authReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`),
      });
    } else {
      this.authReq = req.clone();
    }

    // send cloned request with header to the next handler.
    return next.handle(this.authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 403) {
          localStorage.clear();
          sessionStorage.clear();

          this.abstractService.presentToast(
            `Sessão inválida. Por favor, autentique novamente!`
          );
          this.router.navigate(['']);
        }

        return throwError(error);
      })
    );
  }
}
