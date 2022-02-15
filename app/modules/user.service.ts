import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { AuthenticationService } from './helpers/services/auth/authentication.service';
import { JwtService } from './helpers/services/auth/jwt-service';
import { TaskDto } from './shared/classes/task-dto';
import { UserDto } from './shared/classes/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private jwtService: JwtService, private router: Router, private authService: AuthenticationService, private http: HttpClient) {
  }
  

  getUserDetailsFromServer(){
    let token = this.authService.getToken();
    if(token){
    let currentUser = this.jwtService.getUsernameFromToken(token);
    if(currentUser){
     let url = environment.userUrl.concat("/").concat(currentUser);
     return this.http.get<any>(url)
     .pipe(
       catchError((error)=>{
        return throwError(error);
       })
     )}
    }
     return null;

  }
  setUserPassword(oldPassword: string,newPassword: string){
   let token = this.authService.getToken();
    if(token){
    let currentUser = this.jwtService.getUsernameFromToken(token);
   if(currentUser){
     let url = environment.userUrl.concat("/").concat(currentUser).concat("/edit/password");
     return this.http.post<any>(url,{oldPassword,newPassword})
     .pipe(
       catchError((error)=>{
        return throwError(error);
       })
     )}}
     return null;

  }
  setUserEmail(email: string){
   let token = this.authService.getToken();
   if(token){
   let currentUser = this.jwtService.getUsernameFromToken(token);
   if(currentUser){
     let url = environment.userUrl.concat("/").concat(currentUser).concat("/edit/email");
     return this.http.post<any>(url,email)
     .pipe(
       catchError((error)=>{
        return throwError(error);
       })
     )}}
     return null;
  }

  deleteAccount(username:string){
   let token = this.authService.getToken();
   if(token){
   let currentUser = this.jwtService.getUsernameFromToken(token);
   if(currentUser){
   let url = environment.userUrl.concat("/").concat(currentUser).concat("/delete");
   return this.http.post<any>(url,null)
   .pipe(
     catchError((error)=>{
      return throwError(error);
     })
   )}}
   return null;
 }
  
 getUserTasksFromServer(isActive: boolean, isExpired: boolean, isArchived: boolean){
  
   let token = this.authService.getToken();
   if(token){
     let currentUser = this.jwtService.getUsernameFromToken(token);
     if(currentUser){
      let url = environment.userUrl.concat("/tasks/").concat(currentUser).concat("/getall");
      url = url.concat("?isActive=");
      if(isActive){
        url = url.concat("true");
      }else{
        url = url.concat("false");
      }
    
      url = url.concat("&isExpired=");
      if(isExpired){url = url.concat("true");}else{url = url.concat("false");}
    
      url = url.concat("&isArchived=");
      if(isArchived){url = url.concat("true");}else{url = url.concat("false");}
      
      return this.http.get<any>(url)
      .pipe(
        catchError((error)=>{
         return throwError(error);
        })
      )}}
      return null;
 }

 createTask(taskDto: TaskDto){
  let token = this.authService.getToken();
  if(token){
    let currentUser = this.jwtService.getUsernameFromToken(token);
    let userId =this.jwtService.getUserIdFromToken(token);
    if(currentUser && userId){
     let url = environment.userUrl.concat("/tasks/").concat(currentUser).concat("/new");
     taskDto.userId = userId;
     return this.http.post<any>(url,taskDto)
     .pipe(
       catchError((error)=>{
        return throwError(error);
       })
     )}}
     return null;
 }

 editTask(taskDto: TaskDto){
  let token = this.authService.getToken();
  if(token){
    let currentUser = this.jwtService.getUsernameFromToken(token);
    let userId =this.jwtService.getUserIdFromToken(token);
    if(currentUser && userId){
     let url = environment.userUrl.concat("/tasks/").concat(userId).concat("/edit");
     alert(taskDto.startDateTime);
     return this.http.post<any>(url,taskDto)
     .pipe(
       catchError((error)=>{
        return throwError(error);
       })
     )}}
     return null;
 }

 deleteTask(taskDto: TaskDto){
  let token = this.authService.getToken();
  if(token){
    let currentUser = this.jwtService.getUsernameFromToken(token);
    let userId =this.jwtService.getUserIdFromToken(token);
    if(currentUser && userId){
     let url = environment.userUrl.concat("/tasks/").concat(userId).concat("/delete");
     return this.http.post<any>(url,taskDto)
     .pipe(
       catchError((error)=>{
        return throwError(error);
       })
     )}}
     return null;
 }
 
 
}
