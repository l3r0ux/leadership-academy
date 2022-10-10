import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup
  loading = false

  constructor(
    public modalService: ModalService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  async submit(): Promise<void> {
    this.signUpForm.controls['email'].markAsTouched()
    if (!this.signUpForm.valid) return

    this.loading = true
    const { email, password } = this.signUpForm.value

    try {
      const res = await this.authService.createUser(email, password)
      if (res?.error) {
        throw new Error(res.error)
      }
      this.modalService.openModal('Sign up success');
    } catch (error: any) {
      if (error.message.includes('email-already-in-use')) {
        this.signUpForm.controls['password'].setErrors({ emailAlreadyInUse: true })
      } else {
        this.modalService.openModal('Sign up failed');
        console.log(error)
      }
    }
    this.loading = false
  }
}
