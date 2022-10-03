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

  // TODO: Show loading spinners and handle errors with dialog potentially
  async login(): Promise<void> {
    const { email, password } = this.loginForm.value

    try {
      await this.authService.login(email, password)
      this.modalService.closeModal()
    } catch (error) {
      console.error(error)
      this.modalService.closeModal()
    }
  }
}
