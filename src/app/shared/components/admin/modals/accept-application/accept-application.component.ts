import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-accept-application',
  templateUrl: './accept-application.component.html',
  styleUrls: ['./accept-application.component.scss']
})
export class AcceptApplicationComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

  acceptApplication(): void {
    console.log(this.modalService.clickedData)
  }
}
