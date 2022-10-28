import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-password-reset-request-failed',
  templateUrl: './password-reset-request-failed.component.html',
  styleUrls: ['./password-reset-request-failed.component.scss']
})
export class PasswordResetRequestFailedComponent implements OnInit {

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

}
