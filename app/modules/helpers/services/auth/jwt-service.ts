import { JsonPipe } from '@angular/common';
import { Injectable, NgModule } from '@angular/core';
import jwt_decode, { InvalidTokenError } from 'jwt-decode';
import { catchError } from 'rxjs/operators';


@Injectable()
@NgModule()
export class JwtService {
  constructor() { }

  private DecodeToken(token: string): string {
    try{
    return jwt_decode(token);
    }catch(e: any){
      if(e instanceof InvalidTokenError){
        return "";
      }
      return '';
    }
  }  

  getUsernameFromToken(token: string){
   let jsonToken = JSON.stringify(this.DecodeToken(token));
   let obj = JSON.parse(jsonToken);
   return obj.sub;
  }

  getUserIdFromToken(token: string){
    let jsonToken = JSON.stringify(this.DecodeToken(token));
    let obj = JSON.parse(jsonToken);
    return obj.userId;
   }
  getAccountTypeFromToken(token: string){
    let jsonToken = JSON.stringify(this.DecodeToken(token));
    let obj = JSON.parse(jsonToken);
    return obj.type;
   }

   getExpDateFromToken(token: string): Date{
    let jsonToken = JSON.stringify(this.DecodeToken(token));
    let obj = JSON.parse(jsonToken);
    return new Date(obj.exp * 1000);
   }
   
}