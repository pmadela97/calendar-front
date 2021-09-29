import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import {catchError, map} from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public router: Router, public authService: AuthenticationService) {
  }
 
  private message: string  | undefined;
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        switch(error.status){
          case 401:
            console.log("BLALBA")
          this.authService.logout();
          break;
        }
        return throwError(error);
      }))
}
}
