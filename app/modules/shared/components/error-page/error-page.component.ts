import { Component, OnInit } from '@angular/core';
import { ErrorInterceptor } from 'src/app/modules/helpers/interceptors/error.interceptor';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }
error: string | undefined;

  ngOnInit(): void {
    
    let errorStatus = localStorage.getItem("errorStatus");
    if(errorStatus){
      console.log(errorStatus);
      this.error = errorStatus;
    }
  }

}
