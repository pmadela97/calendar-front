import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registration-panel',
  templateUrl: './registration-panel.component.html',
  styleUrls: ['./registration-panel.component.css']
})
export class RegistrationPanelComponent implements OnInit {


  ngOnInit(): void {
  }
  closeModal: string | undefined;
  
  constructor(private modalService: NgbModal) {}
    
  closeRegistrationPanel(){
    this.modalService.dismissAll();
  }
}