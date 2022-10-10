import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.applyForm = new FormGroup({
      'trainingType': new FormControl('forum'),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'country': new FormControl(null, [Validators.required]),
      'private-or-org': new FormControl('private'),
    })
  }

  async onSubmit(): Promise<void> {
    this.applyForm.markAllAsTouched();
    if (!this.applyForm.valid) return
    this.loading = true

    try {
      await this.firestoreService.apply(this.applyForm.value)
      this.modalService.openModal('Application successful')
    } catch (error) {
      console.log(error)
      this.modalService.openModal('Application failed')
    }

    this.loading = false
  }
}
