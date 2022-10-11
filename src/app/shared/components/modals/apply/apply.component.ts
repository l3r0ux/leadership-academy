import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.scss']
})
export class ApplyComponent implements OnInit {
  applyForm!: FormGroup
  loading = false

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.applyForm = new FormGroup({
      'program': new FormControl('The Forum'),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'country': new FormControl(null, [Validators.required]),
      'affiliation': new FormControl('Private'),
    })
  }

  async onSubmit(): Promise<void> {
    this.applyForm.markAllAsTouched();
    if (!this.applyForm.valid) return
    this.loading = true

    try {
      const formValue = this.applyForm.value
      formValue.email = this.authService.currentUser.email
      formValue.userId = this.authService.currentUser.userId

      if (this.authService.currentUser.programsEnrolled.includes(formValue.program)) {
        this.applyForm.controls['program'].setErrors({ alreadyEnrolled: true })
      } else {
        await this.firestoreService.apply(formValue)
        this.modalService.openModal('Application successful')
      }
    } catch (error) {
      console.log(error)
      this.modalService.openModal('Application failed')
    }

    this.loading = false
  }
}
