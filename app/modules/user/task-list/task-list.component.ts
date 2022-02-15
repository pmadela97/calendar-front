import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDto } from '../../shared/classes/task-dto';
import { UserService } from '../../user.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  isActive: boolean = true;
  isExpired: boolean = true;
  isArchived: boolean = true;
  tasksList?:TaskDto[];
  filter = "";
  filteredList: any;

  constructor(private userService: UserService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.reloadTasksList();
  }
  getTaskDetails(i:number){
      let modal =this.modalService.open(TaskDetailsComponent,{backdrop:'static'});
      if(this.tasksList){
        modal.componentInstance.isNew = false;
      modal.componentInstance.taskDto =this.tasksList[i];
        modal.dismissed.subscribe(()=>{this.reloadTasksList()});
        modal.closed.subscribe(()=>{this.reloadTasksList()});

      }
  }
  getFilteredTasks(){
    if(this.filter != null && this.filter !='' && this.tasksList){
      this.filteredList = this.tasksList.filter(data=> 
        data.taskName.toLowerCase().includes(this.filter.toLowerCase()) ||
        data.userId.toString().includes(this.filter.toLowerCase()) ||
        data.description.includes(this.filter.toLowerCase())
        );

      this.tasksList = this.filteredList;

  }else{this.reloadTasksList();}
}
  reloadTasksList(){
    this.userService.getUserTasksFromServer(this.isActive,this.isExpired,this.isArchived)?.subscribe(response => {
      if (response) {
        this.tasksList =  Object.values(response);
        for(let i = 0; i <this.tasksList.length; i++){
        }
        
      }
      return [];
    },
    (error)=>{
        switch(error.status){
        case 400:
          //this.errorMessage = "Upss coś poszło nie tak";
          break;
        }
      },
      ()=>{
        if(this.tasksList){
        for(let i = 0; i <this.tasksList.length; i++){
        }
      }
      }
    );

 }
  getDate(date:Date|null){
    if(date){
    return new Date(date);
  }
  return  new Date();
}

archiveTask(i:number){
  if(this.tasksList){
  let task = this.tasksList[i];
  task.taskStatus = "ARCHIVED";
  this.userService.editTask(task)?.subscribe(()=>{
    this.reloadTasksList();
  },(error)=>{},()=>{})
  
  }
}
activateTask(i:number){
  if(this.tasksList){
  let task = this.tasksList[i];
  task.taskStatus = "ACTIVE";
  this.userService.editTask(task)?.subscribe(()=>{
    this.reloadTasksList();
  },(error)=>{},()=>{})
  }
}
deleteTask(i:number){
  if(this.tasksList){
    let task = this.tasksList[i];
    task.taskStatus = "ACTIVE";
    this.userService.deleteTask(task)?.subscribe(()=>{
      this.reloadTasksList();
    },(error)=>{},()=>{})
    }
}

}
