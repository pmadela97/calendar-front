
 export class UserDto{

  readonly userId:number;
  readonly username: string;
  readonly lastname: string;
  readonly firstname: string;
  readonly emailAddress: string;
  readonly accountStatus: string;
  readonly accountType: string;
  
  constructor(userId: number, username: string, firstname: string, lastname: string, emailAddress: string, accountStatus: string, accountType: string){
      this.userId = userId;
      this.username = username;
      this.firstname = firstname;
      this.lastname = lastname;
      this.emailAddress = emailAddress;
      this.accountStatus = accountStatus;
      this.accountType = accountType;
  } 
  
  }