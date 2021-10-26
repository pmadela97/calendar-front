import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserRequest } from '../../shared/classes/UserRequest';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-new-user-panel',
  templateUrl: './new-user-panel.component.html',
  styleUrls: ['./new-user-panel.component.css']
})
export class NewUserPanelComponent implements OnInit {

  constructor(private modalService: NgbModal, private adminService: AdminService, private router: Router, ) { }

  userForm = new FormGroup({
    usernameInput: new FormControl('',Validators.required),
    passwordInput: new FormControl('',Validators.required),
    firstnameInput: new FormControl('',Validators.required),
    lastnameInput: new FormControl('',Validators.required),
    emailAddressInput: new FormControl('',Validators.required)

  })
  errorMessage ="";

  ngOnInit(): void {
  }
  @Input() accountType: string |undefined;

  closeRegistrationPanel(){
    this.modalService.dismissAll();
  }
  get usernameInput(){
    return this.userForm.get("usernameInput");
  }
  get passwordInput(){
    return this.userForm.get("passwordInput");
  }
  get firstnameInput(){
    return this.userForm.get("firstnameInput");
  }
  get lastnameInput(){
    return this.userForm.get("lastnameInput");
  }
  get emailAddressInput(){
    return this.userForm.get("emailAddressInput");
  }
  

  createUser(){
    let user = new UserRequest(this.usernameInput?.value,this.firstnameInput?.value,this.lastnameInput?.value,this.passwordInput?.value,this.emailAddressInput?.value);
    if(this.accountType){
      switch(this.accountType){
        
        case "USER":
          this.adminService.createUser(user).subscribe(
            (data)=>{},
            (error)=>{
              this.errorMessage = "Coś poszło nie tak!!!";          
            },
            ()=>{
              alert("Utworzono użytkownika")
              this.closeRegistrationPanel();
            }
          );
        break;

        case"ADMIN":
        this.adminService.createAdmin(user).subscribe(
          (data)=>{

          },
          (error)=>{},
          ()=>{
            alert("Utworzono użytkownika")
              this.closeRegistrationPanel();
              
          }
        );
        break;

        default:
          break;
      }
    }
  }

}
