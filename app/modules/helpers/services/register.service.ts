import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(username:string,firstname:string,lastname:string,password:string,emailAddress:string){
    return this.http.post<any>(environment.apiUrl.concat("/registration"),{username,firstname,lastname,password,emailAddress})
    .pipe(
      catchError((error)=>{
       return throwError(error);
      })
  
    )
  }
}
