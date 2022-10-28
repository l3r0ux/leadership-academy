import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-password-reset-request-success',
  templateUrl: './password-reset-request-success.component.html',
  styleUrls: ['./password-reset-request-success.component.scss']
})
export class PasswordResetRequestSuccessComponent implements OnInit {

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

}
