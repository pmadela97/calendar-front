
 export class UserRequest{

    readonly username: string;
    readonly firstname: string;
    readonly lastname: string;
    readonly password: string;
    readonly emailAddress: string;
    
    constructor(username: string, firstname: string, lastname: string, password: string, emailAddress: string){
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.emailAddress = emailAddress;
        this.password = password;

    } 
    
    }