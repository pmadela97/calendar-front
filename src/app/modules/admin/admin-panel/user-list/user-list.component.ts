import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDto } from '../../../shared/classes/user-dto';
import { AdminService } from '../../services/admin.service';
import { UserDetailsComponent } from '../user-details/user-details.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private adminService: AdminService, private modalService: NgbModal) {
   }
  errorMessage: string =""; 
  public index : any;
  userList!: UserDto[];
  isActive: boolean = true;
  isBlocked: boolean = true;
  isExpired: boolean = true;
  isUnconfirmed: boolean = true;
  filterString = "";
  filteredList: any;

  getFilteredUsers(){
    if(this.filterString != null && this.filterString !='' && this.userList){
      this.filteredList = this.userList.filter(data=> 
        data.firstname.toLowerCase().includes(this.filterString.toLowerCase()) ||
        data.lastname.toLowerCase().includes(this.filterString.toLowerCase()) ||
        data.userId.toString().includes(this.filterString.toLowerCase()) ||
        data.emailAddress.toLowerCase().includes(this.filterString.toLowerCase()) ||
        data.username.includes(this.filterString.toLowerCase())
        );

      this.userList = this.filteredList;

  }
  else{
    this.reloadUserList();
  }
  }
    ngOnInit(): void {
    this.reloadUserList();
  
  }
  
  reloadUserList(){
    this.adminService.getAllUsers(this.isActive,this.isBlocked,this.isExpired,this.isUnconfirmed).subscribe(response => {
      if (response) {
        this.userList =  Object.values(response.responseObject); //This will return the array of object values.
      }
      return [];
    },

      (error)=>{
        switch(error.status){
        case 400:
          this.errorMessage = "Upss coś poszło nie tak";
          break;
        }
      }
    );

 }
 btnEditClick(i:any){
   if(this.userList[i])
  this.index =i;
  let modal =this.modalService.open(UserDetailsComponent,{backdrop: 'static'});
  (modal.componentInstance as UserDetailsComponent).userDto = this.userList[i];
  modal.dismissed.subscribe(()=>{
    this.reloadUserList();
  })
  modal.closed.subscribe(()=>{
    this.reloadUserList();
  })
} 
}
