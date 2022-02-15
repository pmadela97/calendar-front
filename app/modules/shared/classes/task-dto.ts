
 export class TaskDto{

    public taskId:number;
    public taskName: string;
    public startDateTime: Date;
    public endDateTime: Date;
    public description: string;
    public taskStatus: string;
    public userId :number;

    
    constructor(taskId: number, taskName: string, start: Date, end: Date, description: string, taskStatus: string, userId: number){

        this.taskId = taskId;
        this.taskName = taskName;
        this.startDateTime = new Date(start);
        this.endDateTime = new Date(end);
        this.description = description;
        this.taskStatus = taskStatus;
        this.userId = userId;
    } 
  
    
    }