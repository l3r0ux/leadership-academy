import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.scss']
})
export class AddSessionComponent implements OnInit {
  loading = false
  addSessionForm!: FormGroup;

  constructor(
    public modalService: ModalService,
    private firestoreService: FirestoreService,
    private snackbarService: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.addSessionForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'date': new FormControl(null, [Validators.required]),
    })
  }

  async onSubmit(): Promise<void> {
    this.addSessionForm.markAllAsTouched()
    if (!this.addSessionForm.valid) return

    let foundSession = 
      this.modalService.data[this.modalService.data?.findIndex((session: any) => session.name === this.addSessionForm.value.name)]

    if (foundSession) {
      this.addSessionForm.controls['name'].setErrors({ exists: true })
      return
    }
    
    let session = {
      name: this.addSessionForm.value.name,
      date: this.addSessionForm.value.date,
      videos: [],
      galleryURLs: [],
      teachingMaterials: []
    }

    this.loading = true

    try {
      if (this.router.url.includes('leadership-academy')) {
        await this.firestoreService.addData(session, 'leadership-academy-sessions')
      } else if (this.router.url.includes('the-forum')) {
        await this.firestoreService.addData(session, 'the-forum-sessions')
      } else if (this.router.url.includes('pauline')) {
        await this.firestoreService.addData(session, 'pauline-leadership-sessions')
      }
      this.snackbarService.showSnackbar({ text: 'Session succesfully added!', success: true })
    } catch (error) {
      console.error(error)
      this.snackbarService.showSnackbar({ text: 'Something went wrong.', success: false })
    }

    this.loading = false
    this.modalService.closeModal()
  }
}
