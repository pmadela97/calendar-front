import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../../helpers/services/auth/authentication.service';
import { ErrorInterceptor } from '../../helpers/interceptors/error.interceptor';
import { Router } from '@angular/router';
import { JwtService } from '../../helpers/services/auth/jwt-service';
import { RegistrationPanelComponent } from '../registration-panel/registration-panel.component';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  loginForm = new FormGroup({
    usernameInput: new FormControl('',Validators.required),
    passwordInput: new FormControl('',Validators.required)
  })
  errorMessage: string =""; 


  ngOnInit(): void {
  }
get usernameInput(){
  return this.loginForm.get("usernameInput");
}
get passwordInput(){
  return this.loginForm.get("passwordInput");
}


  constructor(private modalService: NgbModal,private authService: AuthenticationService, private router: Router, private jwtService: JwtService) {}
    
  openRegistrationPanel() {
   let modal= this.modalService.open(RegistrationPanelComponent,{backdrop: 'static'});
  }
   
  
  login(){
    this.authService.login(this.usernameInput?.value,this.passwordInput?.value).subscribe(
      (data)=>{
        this.authService.saveToken(data.jwttoken);
      },
      (error)=>{
        switch(error.status){
        case 400:
        case 403:
          this.errorMessage = "Nieprawidłowa nazwa użytkownika lub hasło";
          break;
        }
      },
      ()=>{
        let token = this.authService.getToken();
        if(token){
          let type = this.jwtService.getAccountTypeFromToken(token);
          let username = this.jwtService.getUsernameFromToken(token);
          switch(type){
            case 'USER':
              this.router.navigate(['/user/']);
              break;
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            default:
              this.authService.logout()
          }
        }

      }
    );
    console.log(this.errorMessage);
  }

}
