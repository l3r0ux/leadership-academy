import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-sign-up-fail',
  templateUrl: './sign-up-fail.component.html',
  styleUrls: ['./sign-up-fail.component.scss']
})
export class SignUpFailComponent implements OnInit {

  constructor(public modalService: ModalService) { }

  ngOnInit(): void {
  }

}
