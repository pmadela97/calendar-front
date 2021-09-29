import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Form, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../../helpers/services/auth/authentication.service';
import { ErrorInterceptor } from '../../helpers/interceptors/error.interceptor';
import { Router } from '@angular/router';

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


  constructor(private modalService: NgbModal,private authService: AuthenticationService, private router: Router) {}
    
  openRegistrationPanel(content: any) {
    this.modalService.open(content,{backdrop: 'static'});
  }
   
  login(){
    this.authService.login(this.usernameInput?.value,this.passwordInput?.value).subscribe(
      (data)=>{
        localStorage.setItem('jwttoken', data.jwttoken);
              localStorage.setItem('firstname', JSON.stringify(data.firstname));
              localStorage.setItem('lastname', JSON.stringify(data.lastname));
              localStorage.setItem('accountType',data.accountType);



      },
      (error)=>{
        switch(error.status){
        case 400:
          this.errorMessage = "Nieprawidłowa nazwa użytkownika lub hasło";
          break;
        }
      },
      ()=>{
        let value = localStorage.getItem('accountType');
        console.log(value);
        if(value === "USER")
          this.router.navigate(["/user"]);
        else if(value ==="ADMIN")
          this.router.navigate(["/admin"]);

      }
    );
    console.log(this.errorMessage);
  }

}
