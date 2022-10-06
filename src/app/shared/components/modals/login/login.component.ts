import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  
  constructor(
    public modalService: ModalService,
    private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  async login(): Promise<void> {
    this.loginForm.controls['email'].markAsTouched()
    this.loginForm.controls['password'].markAsTouched()
    if (!this.loginForm.valid) return

    const { email, password } = this.loginForm.value

    this.loading = true
    try {
      await this.authService.login(email, password)
      this.modalService.closeModal()
    } catch (error: any) {
      console.error(error.code)
      if (error.code.includes('wrong-password') || error.code.includes('user-not-found'))
        this.loginForm.controls['password'].setErrors({ incorrectPassword: true })
    }
    this.loading = false
  }
}
