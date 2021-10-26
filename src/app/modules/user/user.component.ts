import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../helpers/services/auth/authentication.service';
import { TaskDto } from '../shared/classes/task-dto';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private modalService: NgbModal, private authService: AuthenticationService) { }
  username?: string;
  ngOnInit(): void {
   this.username=this.authService.getUsername();
  }
  getUserDetails(){
    let modal =this.modalService.open(UserSettingsComponent,{backdrop:'static'});
    modal.closed.subscribe(()=>{location.reload()});
  }
  logout(){
    this.authService.logout();
  }
  getTaskDetails(taskDetails:TaskDto|null,isNew:boolean){
    
    let modal =this.modalService.open(TaskDetailsComponent,{backdrop:'static'});
    modal.componentInstance.taskDto = taskDetails;
    modal.componentInstance.isNew = isNew;
    modal.closed.subscribe(()=>{location.reload()});

  }

}
