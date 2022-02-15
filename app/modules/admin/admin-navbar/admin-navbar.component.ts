import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JwtService } from '../../helpers/services/auth/jwt-service';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private router: Router, private jetService: JwtService, private adminService: AdminService, private modalService: NgbModal) { }
  userDto: any|undefined;
  ngOnInit(): void {
    let token =localStorage.getItem('jwttoken');
    if(token){
    this.username = this.jetService.getUsernameFromToken(token);
  }  
  }

username: string = "";
public value : string| undefined;


  logout(){
    alert("Zostaniesz wylogowany")
    this.router.navigate(['/logout']);
  }
  createUser(content: any){
    
    this.value = "USER";
    let modal = this.modalService.open(content,{backdrop: 'static'});
    modal.dismissed.subscribe(()=>{
      location.reload();
    },
    );
  }
  createAdmin(content: any){
    this.value = "ADMIN";
    let modal =this.modalService.open(content,{backdrop: 'static'});
    modal.dismissed.subscribe(()=>
      {location.reload();}
      );
    
  }
  getAdminDetails(content: any){
    let token =localStorage.getItem('jwttoken');
    if(token){
    this.username = this.jetService.getUsernameFromToken(token);
    this.adminService.getUserDetails(this.username).subscribe(
      (data)=>{
        this.userDto = data.responseObject;
      },
      (error)=>{},
      ()=>{
        this.modalService.open(content,{backdrop: 'static',beforeDismiss:()=>{
          this.router.navigate(['/admin']);
          
          return true;
        }});

      }
    )
    
}
  }
  
}