import { Injectable, Output } from '@angular/core';
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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(public router: Router, public authService: AuthenticationService, private modalService: NgbModal) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  

    return next.handle(request).pipe(
      catchError((error) => {
        switch(error.status){
          case 401:
          this.authService.logout();
          break;
          case 403:
            if(this.router.url =="/home"){
              console.log(this.router.url);
              break;
            }else{
            this.authService.logout();
            this.router.navigate(["/home"])
            break;
            }
            case 400:
            case 404:
            case 200:
              break;
            default:
              localStorage.setItem("errorStatus",(String)(error.status));
              this.router.navigate(["/error"]);
              break;
        }
        return throwError(error);
      }))
}

}
