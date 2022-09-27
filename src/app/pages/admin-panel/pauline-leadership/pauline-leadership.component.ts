import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-pauline-leadership',
  templateUrl: './pauline-leadership.component.html',
  styleUrls: ['./pauline-leadership.component.scss']
})
export class PaulineLeadershipAdminComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
