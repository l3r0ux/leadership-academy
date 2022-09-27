import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-reject-application',
  templateUrl: './reject-application.component.html',
  styleUrls: ['./reject-application.component.scss']
})
export class RejectApplicationComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  rejectApplication(): void {
    console.log(this.modalService.clickedData)
  }
}
