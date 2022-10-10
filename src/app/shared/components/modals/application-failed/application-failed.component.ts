import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-application-failed',
  templateUrl: './application-failed.component.html',
  styleUrls: ['./application-failed.component.scss']
})
export class ApplicationFailedComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
