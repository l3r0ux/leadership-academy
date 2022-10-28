import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.scss']
})
export class PasswordResetRequestComponent implements OnInit {
  passwordResetForm!: FormGroup
  loading = false

  constructor(
    public modalService: ModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.passwordResetForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  async submit(): Promise<void> {
    this.passwordResetForm.controls['email'].markAsTouched()
    if (!this.passwordResetForm.valid) return

    this.loading = true
    const { email } = this.passwordResetForm.value

    try {
      await this.authService.requestPasswordReset(email)
      this.modalService.closeModal();
      this.modalService.openModal('Password reset request sent')
    } catch (error) {
      this.modalService.openModal('Password reset request failed')
    }
    this.loading = false
  }
}
