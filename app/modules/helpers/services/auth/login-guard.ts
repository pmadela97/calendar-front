import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "./authentication.service";


@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}



  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    if (!this.authService.isLoggedIn() || this.authService.isTokenExipired()) {
        this.authService.logout();
    }
    return true;
  }
}
