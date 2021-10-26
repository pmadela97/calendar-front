import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.prod';
import { UserDto } from '../../shared/classes/user-dto';
import { UserRequest } from '../../shared/classes/UserRequest';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


getAllUsers(isActive: boolean, isBlocked: boolean, isExpired: boolean, isUnconfirmed: boolean){
  let url = environment.apiUrl.concat("/api/admin/users");
  url = url.concat("?isActive=");
  if(isActive){
    url = url.concat("true");
  }else{
    url = url.concat("false");
  }

  url = url.concat("&isBlocked=");
  if(isBlocked){url = url.concat("true");}else{url = url.concat("false");}

  url = url.concat("&isExpired=");
  if(isExpired){url = url.concat("true");}else{url = url.concat("false");}
  
  url = url.concat("&isUnconfirmed=");
  if(isUnconfirmed){url = url.concat("true");}else{url = url.concat("false");}

  return this.http.get<any>(url)
    .pipe(
      catchError((error)=>{
       return throwError(error);
      })
    )
}

getUserDetails(username: string){
  let url = environment.apiUrl.concat("/api/admin/users/".concat(username))  
    return this.http.get<any>(url)
      .pipe(
        catchError((error)=>{
         return throwError(error);
        })
      )}

    
changeUserPassword(username: string,password: string){
let url = environment.apiUrl.concat("/api/admin/users/").concat(username).concat("/edit/password")
return this.http.post<any>(url,password)
.pipe(
  catchError((error)=>{
   return throwError(error);
  })
)
}

changeUserEmail(username: string,email: string){
  let url = environment.apiUrl.concat("/api/admin/users/").concat(username).concat("/edit/email")
  return this.http.post<any>(url,email)
  .pipe(
    catchError((error)=>{
     return throwError(error);
    })
  )
}

setUserStatus(username: string,status: string){
  let url = environment.apiUrl.concat("/api/admin/users/").concat(username).concat("/edit/status/").concat(status);
  return this.http.post<any>(url,null)
  .pipe(
    catchError((error)=>{
     return throwError(error);
    })
  )
}

deleteUser(username: string){
  let url = environment.apiUrl.concat("/api/admin/users/").concat(username).concat("/delete");
  return this.http.post<any>(url,null)
  .pipe(
    catchError((error)=>{
     return throwError(error);
    })
  )
}
 createUser(userRequest: UserRequest){
  let url = environment.apiUrl.concat("/api/admin/users/new");
  return this.http.post<any>(url,userRequest)
  .pipe(
    catchError((error)=>{
     return throwError(error);
    })
  )
}
createAdmin(userRequest: UserRequest){
  let url = environment.apiUrl.concat("/api/admin/users/newadmin");
  return this.http.post<any>(url,userRequest)
  .pipe(
    catchError((error)=>{
     return throwError(error);
    })
  )
}







}
