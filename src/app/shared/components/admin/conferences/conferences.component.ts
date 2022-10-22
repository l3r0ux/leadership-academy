import { Component, Input, OnInit } from '@angular/core';
import { Conference } from 'src/app/shared/models/conference';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesAdminComponent implements OnInit {
  @Input() countries!: Array<any>

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
