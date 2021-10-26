import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDto } from '../../shared/classes/task-dto';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  @Input()taskDto!: TaskDto;
  @Input() isNew? : boolean;
  startDate? : any;
  taskName?:any;
  description: any;
  endDate? :any;

  errorMessage?: string;
  successMessage?: string;
  constructor(private activeModal: NgbActiveModal, private datePipe: DatePipe, private userService: UserService){}

  ngOnInit(): void {
    if( this.isNew === true){
        this.taskDto = new TaskDto(0,"",new Date(Date.now()),new Date(Date.now()),"","ACTIVE",0);
    }else{
      this.taskName = this.taskDto.taskName;
      this.description = this.taskDto.description;
    }
        this.startDate =this.datePipe.transform(this.taskDto.startDateTime,"yyyy-MM-ddTHH:mm");
        this.endDate =this.datePipe.transform(this.taskDto.endDateTime,"yyyy-MM-ddTHH:mm");
      

    }
  dismissModal(){
    this.activeModal.dismiss();
  }
addNewTask(){
  let task = new TaskDto(0,this.taskName,new Date(Date.parse(this.startDate)),new Date(Date.parse(this.endDate)),this.description,"ACTIVE",0);
  this.errorMessage = "";
  if(task.taskName ===null|| task.taskName ==="" || task.taskName===" "){
    this.errorMessage ="Nazwa wydarzenia nie może być pusta";
    return;
  }
  if(this.startDate === "" || this.endDate ===""){
    this.errorMessage ="Wybierz datę początku i końca wydarzenia";
    return;
  }
  
  this.userService.createTask(task)?.subscribe(
    ()=>{
      this.activeModal.close();

    },
    (error)=>{
      if(error){
        this.errorMessage = this.errorMessage = error.status;
      }
    },
    ()=>{
    }

  );
}


editTask(){
  this.errorMessage = ""
  
  if(this.taskDto.taskName ===null|| this.taskDto.taskName ==="" || this.taskDto.taskName===" "){
    this.errorMessage ="Nazwa wydarzenia nie może być pusta";
    return;
  }
  if(this.startDate === "" || this.endDate ===""){
    this.errorMessage ="Wybierz datę początku i końca wydarzenia";
    return;
  }
  let task = new TaskDto(this.taskDto.taskId,this.taskName,new Date(this.startDate),new Date(this.endDate),this.description,this.taskDto.taskStatus,this.taskDto.userId);
  alert(task.startDateTime);
  this.userService.editTask(task)?.subscribe(
    ()=>{
      this.successMessage = "Pomyślnie edytowano wydarzenie"

    },
    (error)=>{
      if(error){
        this.errorMessage = this.errorMessage = error.status;
      }
    },
    ()=>{
    }

  );
}



}

