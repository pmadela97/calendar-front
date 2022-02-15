import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from '../../shared/classes/user-dto';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  userDetails?: UserDto;
  oldPassword?: string;
  newPassword?: string;
  newRPassword?: string;
  oldEmail?: string;
  newEmail?: string;
  newREmail?: string;
  username?: string;
  errorMessage?:string;
  succesMessage?:string;


  constructor(private userService: UserService, private modalService: NgbModal,private activeModal: NgbActiveModal, private router: Router) {
  
   }

  ngOnInit(): void {
    this.getUserDetails("");
  }

  getUserDetails(message: string){
    this.userService.getUserDetailsFromServer()?.subscribe(
    (response)=>{
      this.userDetails = response.responseObject;
      this.errorMessage = "";
      this.succesMessage= message;
    },
    (error)=>{
        this.errorMessage = "Coś poszło nie tak, status: "+ error.status;
      }

      );
  }

  changeUserPassword(){
    if(this.oldPassword && this.newPassword && this.oldPassword!=this.newPassword){
      this.userService.setUserPassword(this.oldPassword,this.newPassword)?.subscribe(
        ()=>{
          this.getUserDetails("hasło zmieniono");
          
        },
        (error)=>{
          this.errorMessage = "Ups: "+ error.status;
        }
      )
    }
  };
  

  changeUserEmail(){
    if(this.oldEmail === this.userDetails?.emailAddress && this.newEmail && this.newEmail!="" && this.newEmail === this.newREmail){
      this.userService.setUserEmail(this.newEmail)?.subscribe(
        ()=>{
          this.getUserDetails("Email zmieniono");
          
        },
        (error)=>{
          this.errorMessage = "Ups: "+ error.status;
        }
      )
    }
  };

  deleteUserAccount(){
    if(this.userDetails&&this.username === this.userDetails?.username){
      this.userService.deleteAccount(this.userDetails?.username)?.subscribe(
        ()=>{
          this.activeModal.close();
          this.router.navigate(["/logout"]);
          
        }
      )
    }
  };
  dismissModal(){
    this.activeModal.dismiss();
  }

}
