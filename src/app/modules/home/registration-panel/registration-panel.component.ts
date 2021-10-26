import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../../helpers/services/register.service';
import { UserDto } from '../../shared/classes/user-dto';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrls: ['./registration-panel.component.css']
})
export class RegistrationPanelComponent implements OnInit {

  username?:any;
  firstname?:any;
  lastname?:any;
  password?:any;
  emailAddress?:any;
  successMessage ="";
  errorMessage="";

  ngOnInit(): void {
  }
  closeModal: string | undefined;
  
  constructor(private modalService: NgbModal, private registerService: RegisterService) {}
    
  closeRegistrationPanel(){
    

    this.modalService.dismissAll();
  }

  register(){
    alert(this.username);
    alert(this.firstname);

    if(this.username &&this.firstname&&this.lastname&&this.password&&this.emailAddress){
    
    this.registerService.register(this.username,this.firstname,this.lastname,this.password,this.emailAddress).subscribe((data)=>{
      this.successMessage="Pomyślnie zarejestrowano, sprawdź maila w celu potwierdzenia";
      this.errorMessage="";
    },(error)=>{
      this.errorMessage= error.status;
    })
  }
}
  
}