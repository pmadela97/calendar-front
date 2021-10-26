import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from 'src/app/modules/shared/classes/user-dto';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  @Input()
  public userDto!: UserDto;
  passwordForm = new FormGroup({
    password1: new FormControl('',Validators.required),
    password2: new FormControl('',Validators.required)
  })
  emailForm = new FormGroup({
    email1: new FormControl('',Validators.required),
    email2: new FormControl('',Validators.required)
  })
errorMessage: string ="";
usernameBlock: string="";
usernameUnblock: string="";
usernameDelete: string="";



  get password1(){
  return this.passwordForm.get("password1");
}
get password2(){
  return this.passwordForm.get("password2");
}
get email1(){
  return this.emailForm.get("email1");
}
get email2(){
  return this.emailForm.get("email2");
}
  constructor(private modalService: NgbModal, private adminService: AdminService) { }

  closeRegistrationPanel(){
    this.modalService.dismissAll();
  }

  ngOnInit(): void {
    
  }

  changePassword(){
    if(this.password1?.value && this.password2?.value && this.userDto){
      if(this.password1.value === this.password2.value){
        alert("Password changed");
        this.adminService.changeUserPassword(this.userDto?.username, this.password1.value).subscribe(()=>{        this.modalService.dismissAll();
        });
      }
      else{
        this.errorMessage = "Hasła muszą być takie same!!!";
      }
    }

  }
  changeEmail(){
    if(this.email1?.value && this.email2?.value && this.userDto?.username){
      if(this.email1.value === this.email2.value){
        alert("Email changed");
        this.adminService.changeUserEmail(this.userDto?.username, this.email1.value).subscribe(
            ()=>{this.modalService.dismissAll();}
        );
        
      }
      else{
        this.errorMessage = "Maile muszą być takie same!!!";
      }
    }
}
blockUser(){
if(this.usernameBlock !=""&& this.usernameBlock && this.userDto){
  if(this.usernameBlock === this.userDto.username){
    alert("User blocked");
    this.adminService.setUserStatus(this.userDto?.username,"BLOCKED").subscribe(()=>{
      this.modalService.dismissAll();
    });
    
  }else{
    this.errorMessage = "Nazwa użytkownika jest niepoprawna"
  }
}
}
unblockUser(){
  if(this.usernameUnblock !=""&& this.usernameUnblock && this.userDto){
    if(this.usernameUnblock === this.userDto.username){
      alert("User unblocked")
      this.adminService.setUserStatus(this.userDto?.username,"ACTIVE").subscribe(
        ()=>{
          this.modalService.dismissAll();

        }
      );
    }else{
    }
  }
  }
deleteUser(){
  if(this.usernameDelete !=""&& this.usernameDelete && this.userDto){
    if(this.usernameDelete === this.userDto.username){
      this.adminService.deleteUser(this.usernameDelete).subscribe(
        ()=>{},
        ()=>{},
        ()=>{
          alert("User deleted")
          this.modalService.dismissAll();
        }
      );
    }else{
      this.errorMessage = "Nazwa użytkownika jest niepoprawna"
    }
  }
  }

}
