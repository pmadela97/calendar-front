import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./auth/authentication.service";


@Injectable()
export class HomeGuard implements CanActivate{


    constructor(private router: Router, private authService: AuthenticationService){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean>|Promise<boolean>|boolean {
          let url = this.router.url;
      if(url == "/home" || url =="/" ){
          if(this.authService.isLoggedIn()){
            alert(url + "false" + "login");
            switch(this.authService.getAccountType()){
                case null:
                    this.authService.logout();
                    return true;
                case 'ADMIN':
                    this.router.navigate(["/admin"])
                    return false;
                case 'USER':
                    this.router.navigate(['/user']);
                    return false;
            }
          }
          alert(url + "false" + "notlogin");
          return true;  
      }
      alert(url + "true");

        return true;

      
    }
}