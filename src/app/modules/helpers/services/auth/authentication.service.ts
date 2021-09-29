import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDto } from 'src/app/modules/shared/user-dto';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';
import { error } from '@angular/compiler/src/util';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,private router: Router) {
  }

   private errorMessage: string ="";

   getErrorMessage(): string{
     return this.errorMessage;
  }
login(username: string, password: string): Observable<any>{
  return this.http.post<any>(`http://localhost:8080/auth`, { username, password })
    .pipe(
      catchError((error)=>{
       return throwError(error);
      })

    )
}
  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('jwttoken');
      localStorage.removeItem('firstname');
      localStorage.removeItem('lastname');
      this.router.navigate(['/home']);
  }
}