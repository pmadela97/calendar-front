import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = localStorage.getItem('jwttoken');
    if(currentUser){
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentUser}`,
            },
        });
      }
      else{
        
      }

    return next.handle(request);
}

}
