import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ErrorInterceptor } from '../../interceptors/error.interceptor';
import { error } from '@angular/compiler/src/util';
import { catchError } from 'rxjs/operators';
import { JwtService } from './jwt-service';
import { UserDto } from 'src/app/modules/shared/classes/user-dto';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{


  constructor(private http: HttpClient,private router: Router, private jwtService: JwtService) {  }
 
   private errorMessage: string ="";

   getErrorMessage(): string{
     return this.errorMessage;
  }
login(username: string, password: string): Observable<any>{
  return this.http.post<any>(environment.apiUrl.concat("/auth"), { username, password })
    .pipe(
      catchError((error)=>{
       return throwError(error);
      })

    )
}
  logout() {
      localStorage.removeItem('jwttoken');
      localStorage.removeItem('errorStatus');
      this.router.navigate(['/home']);
  }
  saveToken(token: string){
    localStorage.setItem('jwttoken',token);
  }
  getToken(){
    return localStorage.getItem('jwttoken');
  }
  isLoggedIn(){
    if(this.getToken() &&!this.isTokenExipired() && this.getAccountType()!=null){
      return true;
    }
    localStorage.removeItem('jwttoken');
     return false;
  }
  isTokenExipired():boolean{
    let token = this.getToken();
    if(token){
      let now = new Date(Date.now());
      if(now.getTime() > this.jwtService.getExpDateFromToken(token).getTime()){
        alert(this.jwtService.getExpDateFromToken(token));
        return true;
      }
      return false;
    }
    return true;
  }
getAccountType(){
  let token = this.getToken();
  if(token){
let type = this.jwtService.getAccountTypeFromToken(token);
    switch(type){
      case 'ADMIN':
        return 'ADMIN';
      case 'USER':
        return 'USER';
        default:
          return null;  
    }
  }
  return null;
}
getUsername(){
  let token = this.getToken();
  if(token){
    return this.jwtService.getUsernameFromToken(token);
  }
}



  
}